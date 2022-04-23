export type User = {
  id: number;
  name: string;
  phoneNumber: string;
  avatarCloudinaryPublicId?: string;
};
export type RollData = {
  id: number;
  name: string;
  description: string;
  accessCodeRoll: string;
  creationDate: string;
  closingDate: string;
  deliveryType: string;
  pictureNumber: number;
  remainingPictures: number;
  openingStatus: boolean;
  participants: Participant[];
  coverPictureId: string;
};

export type Picture = {
  cloudinaryPublicId: string;
  width: number;
  height: number;
  id: number;
  createdAt: Date;
  user: {
    id: number;
    name: string;
    phoneNumber: string;
  };
};

export type Participant = {
  id: number;
  email: string;
  phoneNumber: string;
  role: string;
  hasJoined: boolean;
  isRemoved: boolean;
  hasDiscoverRoll: boolean;
  avatarImageUri?: string;
  pictureCount: number;
  userId: number;
};

export type InvitationRoll = {
  admin: {
    name: string;
  };
  roll: {
    id: number;
    name: string;
    closingDate: string;
  };
};

export type SvgType = "eye" | "box" | "mailbox";

export type Colors =
  | "grey"
  | "lightGrey"
  | "green"
  | "red"
  | "blue"
  | "white"
  | "pink"
  | "yellow"
  | "black";

export type UserCard = {
  id: number;
  name?: string;
  avatarCloudinaryPublicId?: string;
  phoneNumber?: string;
};

export type ErrorCode = "UNAUTHENTICATED";

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
