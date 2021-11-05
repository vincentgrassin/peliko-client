import * as Yup from "yup";
import { resources } from "../../themeHelpers";

export const loginSchema = Yup.object().shape({
  phoneNumber: Yup.string().min(3, resources.phoneNumberValidityErrorMessage),
  password: Yup.string().required(resources.required)
});

export type LoginValues = {
  phoneNumber: string | undefined;
  password: string;
  email?: string;
  userName?: string;
  passwordConfirm?: string;
};

export const rollCreationSchema = Yup.object().shape({
  rollName: Yup.string().required(resources.required),
  description: Yup.string().required(resources.required),
  date: Yup.string().required(resources.required),
  participantsContact: Yup.array()
    .of(
      Yup.object().shape({
        phoneNumber: Yup.string().min(
          3,
          resources.phoneNumberValidityErrorMessage
        )
      })
    )
    .required(resources.participantEmptyErrorMessage)
    .min(1, resources.participantMinimunNumberErrorMessage)
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
