export type RollData =
  | {
      id: string;
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
      pictures: Picture[];
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
};
