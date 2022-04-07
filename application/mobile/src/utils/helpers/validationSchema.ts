import * as Yup from "yup";
import { resources } from "../../themeHelpers";

export const loginSchema = Yup.object().shape({
  isSignUpForm: Yup.boolean(),
  userName: Yup.string().when("isSignUpForm", {
    is: true,
    then: Yup.string().required(resources.required),
    otherwise: Yup.string(),
  }),
  phoneNumber: Yup.object().shape({
    isValid: Yup.bool().isTrue(resources.phoneNumberValidityErrorMessage),
    value: Yup.string().required(resources.required),
  }),
  password: Yup.string().required(resources.required),
  passwordConfirm: Yup.string().when("isSignUpForm", {
    is: true,
    then: Yup.string()
      .oneOf([Yup.ref("password"), null], resources.errorNotMatchingPassword)
      .required(resources.required),
    otherwise: Yup.string(),
  }),
});

export type PhoneNumberCard = {
  value: string;
  isValid: boolean;
  countryCode: string;
};

export type LoginValues = {
  phoneNumber: PhoneNumberCard;
  password: string;
  email?: string;
  userName?: string;
  passwordConfirm?: string;
  isSignUpForm: boolean;
};

export const rollCreationSchema = Yup.object().shape({
  rollName: Yup.string().required(resources.required),
  description: Yup.string().required(resources.required),
  date: Yup.string().required(resources.required),
  participantsContact: Yup.array()
    .of(
      Yup.object().shape({
        phoneNumber: Yup.object().shape({
          isValid: Yup.bool().isTrue(resources.phoneNumberValidityErrorMessage),
          value: Yup.string().required(resources.required),
        }),
      })
    )
    .required(resources.participantEmptyErrorMessage)
    .min(1, resources.participantMinimunNumberErrorMessage),
});

export type ParticipantContact = {
  name: string;
  phoneNumber: PhoneNumberCard;
};

export type RollCreationValues = {
  rollName: string;
  description: string;
  date: Date;
  participantsContact: ParticipantContact[];
};

export type ProfileValues = Partial<Pick<LoginValues, "userName">> & {
  profilePictureCloudinaryId?: string;
  phoneNumber: Partial<PhoneNumberCard>;
};

export const userProfileSchema = Yup.object().shape({
  userName: Yup.string().required(resources.required),
  phoneNumber: Yup.object().shape({
    isValid: Yup.bool().isTrue(resources.phoneNumberValidityErrorMessage),
    value: Yup.string().required(resources.required),
  }),
});
