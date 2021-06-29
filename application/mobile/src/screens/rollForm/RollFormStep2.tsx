import React from "react";
import { useField, useFormikContext } from "formik";
import {
  View,
  StyleSheet,
  Input,
  Autocomplete,
  TouchableOpacity,
  Text,
  Icon
} from "../../components";
import { iconSet } from "../../themeHelpers";
import { ParticipantContact, FormValues } from "./RollForm";
import { usePhoneContacts, Contact } from "../../utils/hooks/usePhoneContacts";

interface RollFormStep2Props {}

const style = StyleSheet.create({
  rollForm: {
    marginTop: 100
  },
  participantField: {
    display: "flex",
    flexDirection: "row"
  },
  inputParticipant: {
    width: "70%"
  },
  autocomplete: {
    display: "flex",
    flexDirection: "row"
  }
});

const RollFormStep2: React.FC<RollFormStep2Props> = ({}) => {
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

  const handleAddField = () =>
    handleInputChange(searchContact, values.participantsContact.length);

  const handleChangeText = (val: string) => {
    const isEmptySearchField = val === "";
    setIsHiddenResult(isEmptySearchField);
    setSearchContact(val);
    findContact(val);
  };

  return (
    <View style={style.rollForm}>
      <View style={style.autocomplete}>
        <Autocomplete
          data={phoneContactData}
          hideResults={isHiddenResult}
          value={searchContact}
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
        <Icon
          type={iconSet.plus.type}
          name={iconSet.plus.name}
          onPress={handleAddField}
        />
      </View>
      {values.participantsContact.map(
        (participant: ParticipantContact, index: number) => (
          <View key={index} style={style.participantField}>
            <Input
              value={participant.phoneNumber}
              onChangeText={(val) => handleInputChange(val, index)}
              containerStyle={style.inputParticipant}
            />

            <Icon
              type={iconSet.minus.type}
              name={iconSet.minus.name}
              onPress={() => handleRemoveFields(index)}
            />
          </View>
        )
      )}
    </View>
  );
};

export default RollFormStep2;
