import React from "react";
import { View, StyleSheet, Button, Input } from "../../components";
import { useField, useFormikContext } from "formik";
import { Participants, FormValues } from "./RollForm";

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

  const handleInputChange = (val: string, index: number) => {
    const participantsList = values.participants;
    participantsList[index] = { name: "", phoneNumber: val };
    setFieldValue(field.name, participantsList);
  };

  console.log("out", values);

  return (
    <View style={style.RollFormStep2}>
      {values.participants.map((participant: Participants, index: number) => {
        console.log("participant", participant);
        return (
          <View key={index}>
            <Input
              value={participant.phoneNumber}
              onChangeText={(val) => handleInputChange(val, index)}
            />
            <Button onPress={handleAddFields} title="More" />
            <Button onPress={() => handleRemoveFields(index)} title="Less" />
          </View>
        );
      })}
      {errors.name && (
        <View style={{ backgroundColor: "red" }}>{errors.name}</View>
      )}
    </View>
  );
};

export default RollFormStep2;

const style = StyleSheet.create({
  RollFormStep2: {
    marginTop: 100
  }
});
