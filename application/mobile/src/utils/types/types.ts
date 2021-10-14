export type RollData =
  | {
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
    }
  | undefined;

export type Picture = {
  cloudinaryPublicId: string;
  width: number;
  height: number;
  id: number;
};

export type Participant = {
  id: string;
  email: string;
  phoneNumber: string;
  role: string;
  hasJoined: boolean;
  isRemoved: boolean;
  hasDiscoverRoll: boolean;
  avatarImageUri?: string;
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
