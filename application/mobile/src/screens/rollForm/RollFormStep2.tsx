import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Input,
  Autocomplete,
  TouchableOpacity,
  Text,
  Icon
} from "../../components";
import { iconSet, resources } from "../../themeHelpers";

import { useField, useFormikContext } from "formik";
import { Participants, FormValues } from "./RollForm";
import usePhoneContacts, { Contact } from "../../utils/hooks/usePhoneContacts";

interface RollFormStep2Props {}

const RollFormStep2: React.FC<RollFormStep2Props> = ({}) => {
  const { setFieldValue, values, errors } = useFormikContext<FormValues>();
  const [field] = useField("participants");

  const handleAddFields = () => {
    setFieldValue(field.name, [
      ...values.participants,
      { name: "", phoneNumber: "" }
    ]);
  };

  const handleRemoveFields = (index: number) => {
    const participantsList = values.participants;
    participantsList.splice(index, 1);
    setFieldValue(field.name, participantsList);
  };

  const handleInputChange = (val: string | undefined, index: number) => {
    const participantsList = values.participants;
    participantsList[index] = { name: "", phoneNumber: val };
    setFieldValue(field.name, participantsList);
  };

  const [isHiddenResult, setIsHiddenResult] = React.useState(false);
  const [searchContact, setSearchContact] = React.useState("");
  const {
    phoneContactData,
    loadPhoneContacts,
    findContact
  } = usePhoneContacts();

  return (
    <View style={style.rollForm}>
      <Button
        onPress={loadPhoneContacts}
        title={resources.accessPhoneContact}
      />
      <Autocomplete
        data={phoneContactData}
        hideResults={isHiddenResult}
        defaultValue={searchContact}
        onChangeText={(val) => {
          val == "" ? setIsHiddenResult(true) : setIsHiddenResult(false);
          setSearchContact(val);
          findContact(val);
        }}
        flatListProps={{
          renderItem: ({ item }: { item: Contact }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setIsHiddenResult(true);
                  handleInputChange(
                    item.phoneNumbers ? item.phoneNumbers[0].number : "",
                    values.participants.length
                  );
                }}
              >
                <Text>
                  {item.name} {item.phoneNumbers && item.phoneNumbers[0].number}
                </Text>
              </TouchableOpacity>
            );
          }
        }}
      />
      {values.participants.map((participant: Participants, index: number) => (
        <View key={index} style={style.participantField}>
          <Input
            value={participant.phoneNumber}
            onChangeText={(val) => handleInputChange(val, index)}
            containerStyle={style.inputParticipant}
          />
          <Icon
            type={iconSet.plus.type}
            name={iconSet.plus.name}
            onPress={handleAddFields}
          />
          <Icon
            type={iconSet.minus.type}
            name={iconSet.minus.name}
            onPress={() => handleRemoveFields(index)}
          />
        </View>
      ))}
      {errors.name && (
        <View style={{ backgroundColor: "red" }}>{errors.name}</View>
      )}
    </View>
  );
};

export default RollFormStep2;

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
  }
});
