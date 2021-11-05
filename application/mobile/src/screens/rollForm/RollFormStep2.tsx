import React from "react";
import { isString, useField, useFormikContext } from "formik";
import { makeStyles } from "react-native-elements";
import {
  View,
  Input,
  Autocomplete,
  TouchableOpacity,
  Text,
  Icon,
  Button,
  ScrollView
} from "../../components";
import { iconSet, palette, resources, shape } from "../../themeHelpers";
import { usePhoneContacts, Contact } from "../../utils/hooks/usePhoneContacts";
import {
  ParticipantContact,
  RollCreationValues
} from "../../utils/helpers/validationSchema";

interface RollFormStep2Props {}

const useStyles = makeStyles((theme) => ({
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
  autocomplete: {
    // width: "90%"
  },
  addButton: {
    height: 30
  },
  participantsArea: {
    marginTop: shape.spacing(3)
  },
  trashButton: {
    color: palette("lightGrey")
  },
  errorText: {
    color: palette("red")
  }
}));

const RollFormStep2: React.FC<RollFormStep2Props> = ({}) => {
  const styles = useStyles();

  const {
    setFieldValue,
    values,
    errors
  } = useFormikContext<RollCreationValues>();
  const [field, meta] = useField("participantsContact");

  const [isHiddenResult, setIsHiddenResult] = React.useState(true);
  const [searchContact, setSearchContact] = React.useState("");
  const {
    phoneContactData,
    loadPhoneContacts,
    findContact
  } = usePhoneContacts();

  React.useEffect(() => {
    loadPhoneContacts();
  }, [loadPhoneContacts]);

  const handleRemoveFields = (index: number) => {
    const participantsList = values.participantsContact;
    participantsList.splice(index, 1);
    setFieldValue(field.name, participantsList);
  };

  const handleInputChange = (val: string | undefined, index: number) => {
    const participantsList = values.participantsContact;
    participantsList[index] = { name: "", phoneNumber: val };
    setFieldValue(field.name, participantsList);
  };

  const handleAddField = () => {
    setIsHiddenResult(true);
    handleInputChange(searchContact, values.participantsContact.length);
    setSearchContact("");
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

  const handleAutocompleteBlur = () => {
    setIsHiddenResult(true);
  };

  return (
    <View style={styles.rollForm}>
      <Text h1 style={styles.title}>
        {resources.participants}
      </Text>
      <View style={styles.addArea}>
        <Autocomplete
          data={phoneContactData}
          hideResults={isHiddenResult}
          value={searchContact}
          inputContainerStyle={styles.autocomplete}
          onChangeText={handleChangeText}
          onBlur={handleAutocompleteBlur}
          flatListProps={{
            renderItem: renderFlatListItem,
            nestedScrollEnabled: true
          }}
        />
        <Button
          onPress={handleAddField}
          buttonStyle={styles.addButton}
          title={resources.add}
        />
      </View>
      <View style={styles.participantsArea}>
        {values.participantsContact.map(
          (participant: ParticipantContact, index: number) => (
            <View key={index} style={styles.participantField}>
              <View style={styles.inputParticipant}>
                <Input
                  value={participant.phoneNumber}
                  onChangeText={(val) => handleInputChange(val, index)}
                  containerStyle={styles.inputParticipant}
                  errorText={
                    meta.error &&
                    meta.error[index] &&
                    //@ts-ignore
                    meta.error[index].phoneNumber
                      ? //@ts-ignore
                        meta.error[index].phoneNumber
                      : ""
                  }
                />
              </View>
              <Icon
                iconStyle={styles.trashButton}
                type={iconSet.trash.type}
                name={iconSet.trash.name}
                onPress={() => handleRemoveFields(index)}
              />
            </View>
          )
        )}
      </View>
      {meta.error && isString(meta.error) && (
        <Text style={styles.errorText}>{meta.error}</Text>
      )}
    </View>
  );
};

export default RollFormStep2;
