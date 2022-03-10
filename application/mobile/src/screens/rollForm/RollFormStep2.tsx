import * as React from "react";
import { isString, useField, useFormikContext } from "formik";
import { makeStyles } from "react-native-elements";
import { isValidNumber } from "react-native-phone-number-input";
import {
  View,
  Autocomplete,
  TouchableOpacity,
  Text,
  Icon,
  Button,
  PhoneNumberInput
} from "../../components";
import { iconSet, palette, resources, shape } from "../../themeHelpers";
import { usePhoneContacts, Contact } from "../../utils/hooks/usePhoneContacts";
import {
  ParticipantContact,
  RollCreationValues
} from "../../utils/helpers/validationSchema";
import { defaultCountryCode } from "../../utils/helpers/constants";
import { getNumberAfterPossiblyEliminatingZero } from "../../utils/helpers/dataCheckHelper";
import InputWrapper from "../../components/InputWrapper";

interface RollFormStep2Props {}

const useStyles = makeStyles(() => ({
  rollForm: {
    marginTop: shape.spacing(3),
    marginLeft: shape.spacing(2),
    marginRight: shape.spacing(2)
  },
  title: {
    marginBottom: shape.spacing(3)
  },
  participantField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  inputParticipant: {
    width: "90%"
  },
  addArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  addButton: {
    height: 30
  },
  participantsArea: {
    marginTop: shape.spacing(8)
  },
  trashButton: {
    color: palette("lightGrey")
  },
  searchHelperText: {
    marginTop: shape.spacing(2)
  }
}));

const RollFormStep2: React.FC<RollFormStep2Props> = ({}) => {
  const styles = useStyles();

  const { setFieldValue, values, errors } =
    useFormikContext<RollCreationValues>();
  const [field, meta] = useField("participantsContact");

  const [isHiddenResult, setIsHiddenResult] = React.useState(true);
  const [searchContact, setSearchContact] = React.useState("");
  const { phoneContactData, loadPhoneContacts, findContact } =
    usePhoneContacts();

  React.useEffect(() => {
    loadPhoneContacts();
  }, [loadPhoneContacts]);

  const updateParticipantList = (
    value: string,
    countryCode: any,
    index: number
  ) => {
    const check = isValidNumber(value, countryCode);
    const formattedNumber = getNumberAfterPossiblyEliminatingZero(value);
    const participantsList = values.participantsContact;
    participantsList[index] = {
      name: "",
      phoneNumber: {
        value: formattedNumber,
        isValid: check,
        countryCode
      }
    };
    setFieldValue(field.name, participantsList);
  };

  const handleInputChange = (value: string, index: number) => {
    const participantsList = values.participantsContact;
    const countryCode =
      participantsList[index]?.phoneNumber?.countryCode ?? defaultCountryCode;
    updateParticipantList(value, countryCode, index);
  };

  const handleCountryChange = (country: any, index: number) => {
    const participantsList = values.participantsContact;
    const value = participantsList[index].phoneNumber.value ?? "";
    const countryCode = country.cca2;
    updateParticipantList(value, countryCode, index);
  };

  const handleAddField = () => {
    setIsHiddenResult(true);
    handleInputChange(searchContact, values.participantsContact.length);
    setSearchContact("");
  };

  const handleRemoveFields = (index: number) => {
    const participantsList = values.participantsContact;
    participantsList.splice(index, 1);
    setFieldValue(field.name, participantsList);
  };

  const handleChangeText = (val: string) => {
    const isEmptySearchField = val === "";
    setIsHiddenResult(isEmptySearchField);
    setSearchContact(val);
    findContact(val);
  };

  const renderFlatListItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      onPress={() => {
        setIsHiddenResult(true);
        item.phoneNumbers &&
          item.phoneNumbers[0].number &&
          setSearchContact(item.phoneNumbers[0].number);
      }}
    >
      <Text>
        {item.name} {item.phoneNumbers && item.phoneNumbers[0].number}
      </Text>
    </TouchableOpacity>
  );

  // const handleAutocompleteBlur = () => {
  //   setIsHiddenResult(true);
  // };

  return (
    <View style={styles.rollForm}>
      <Text h1 style={styles.title}>
        {resources.participants}
      </Text>
      <View style={styles.addArea}>
        <InputWrapper>
          <Autocomplete
            label={resources.search}
            data={phoneContactData}
            hideResults={isHiddenResult}
            value={searchContact}
            onChangeText={handleChangeText}
            // onBlur={handleAutocompleteBlur}
            flatListProps={{
              renderItem: renderFlatListItem,
              nestedScrollEnabled: true
            }}
          />
        </InputWrapper>
        <Button
          onPress={handleAddField}
          buttonStyle={styles.addButton}
          title={resources.add}
          size="small"
        />
      </View>
      <View style={styles.participantsArea}>
        <View>
          <Text h2> {resources.myParticipants} </Text>
          {values.participantsContact.length === 0 && (
            <Text style={styles.searchHelperText}>
              {resources.searchParticipantHelperText}
            </Text>
          )}
        </View>
        {values.participantsContact.map(
          (participant: ParticipantContact, index: number) => (
            <View key={index} style={styles.participantField}>
              <View style={styles.inputParticipant}>
                <PhoneNumberInput
                  onChangeText={(val) => handleInputChange(val, index)}
                  value={participant.phoneNumber.value}
                  onChangeCountry={(country) => {
                    handleCountryChange(country, index);
                  }}
                  //@ts-ignore
                  errorMessage={
                    errors.participantsContact &&
                    errors.participantsContact[index] &&
                    //@ts-ignore
                    errors.participantsContact[index].phoneNumber
                  }
                />
              </View>
              <Icon
                iconStyle={styles.trashButton}
                {...iconSet.trash}
                onPress={() => handleRemoveFields(index)}
              />
            </View>
          )
        )}
      </View>
      {meta.error && isString(meta.error) && <Text isError>{meta.error}</Text>}
    </View>
  );
};

export default RollFormStep2;
