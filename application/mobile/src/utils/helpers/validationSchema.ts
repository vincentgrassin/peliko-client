import * as Yup from "yup";
import { resources } from "../../themeHelpers";

export const rollCreationSchema = Yup.object().shape({
  rollName: Yup.string().required(resources.required),
  description: Yup.string().required(resources.required),
  date: Yup.string().required(resources.required),
  participantsContact: Yup.array()
    .of(
      Yup.object().shape({
        // name: Yup.string().min(4, 'too short').required('Required'), // these constraints take precedence
        phoneNumber: Yup.string().min(3, "cmon").required("Required") // these constraints take precedence
      })
    )
    .required("Must have friends") // these constraints are shown if and only if inner constraints are satisfied
    .min(3, "Minimum of 3 friends")
});

export type ParticipantContact = {
  name: string;
  phoneNumber: string | undefined;
};

export type RollCreationValues = {
  rollName: string;
  description: string;
  date: Date;
  participantsContact: ParticipantContact[];
};
