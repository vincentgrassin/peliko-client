import React from "react";
import { useField, useFormikContext } from "formik";
import { makeStyles } from "react-native-elements";
import {
  View,
  Input,
  Autocomplete,
  TouchableOpacity,
  Text,
  Icon,
  Button
} from "../../components";
import { iconSet, palette, resources, shape } from "../../themeHelpers";
import { ParticipantContact, FormValues } from "./RollForm";
import { usePhoneContacts, Contact } from "../../utils/hooks/usePhoneContacts";

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
    width: "90%"
  },
  addButton: {
    height: 30
  },
  participantsArea: {
    marginTop: shape.spacing(3)
  },
  trashButton: {
    color: palette("lightGrey")
  }
}));

const RollFormStep2: React.FC<RollFormStep2Props> = ({}) => {
  const styles = useStyles();

  const { setFieldValue, values, errors } = useFormikContext<FormValues>();
  const [field] = useField("participantsContact");
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
    handleInputChange(searchContact, values.participantsContact.length);
    setSearchContact("");
  };

  const handleChangeText = (val: string) => {
    const isEmptySearchField = val === "";
    setIsHiddenResult(isEmptySearchField);
    setSearchContact(val);
    findContact(val);
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
          flatListProps={{
            renderItem: ({ item }: { item: Contact }) => (
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
            )
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
              <Input
                value={participant.phoneNumber}
                onChangeText={(val) => handleInputChange(val, index)}
                containerStyle={styles.inputParticipant}
              />

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
    </View>
  );
};

export default RollFormStep2;
