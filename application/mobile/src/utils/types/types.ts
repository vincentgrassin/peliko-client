export type RollData =
  | {
      id?: number | undefined;
      name?: string | undefined;
      description?: string | undefined;
      accessCodeRoll?: string | undefined;
      creationDate?: string | undefined;
      closingDate?: string | undefined;
      deliveryType?: string | undefined;
      pictureNumber?: number;
      remainingPictures?: number | undefined;
      openingStatus?: boolean;
      participants?: Participant[] | undefined;
      pictures?: Picture[] | undefined;
    }
  | undefined;

export type Picture = {
  id: string;
  name: string;
  date: Date;
  url: string;
  lon: number;
  lat: number;
  width: number;
  height: number;
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
