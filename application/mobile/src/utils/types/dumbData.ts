import { RollData } from "./types";

export const rollData: RollData = {
  id: "123CFZA",
  name: "name",
  description: "description",
  accessCodeRoll: "accessCodeRoll",
  creationDate: "2009-06-15T13:45:30",
  closingDate: "2009-06-15T13:45:30",
  deliveryType: "deliveryType",
  pictureNumber: 25,
  remainingPictures: 23,
  openingStatus: true,
  participants: [],
  pictures: []
};

export const rollData2: RollData = {
  id: "21315CFZA",
  name: "name2",
  description: "description2",
  accessCodeRoll: "accessCodeRoll2",
  creationDate: "2009-06-15T13:45:30",
  closingDate: "2009-06-15T13:45:30",
  deliveryType: "deliveryType2",
  pictureNumber: 25,
  remainingPictures: 22,
  openingStatus: true,
  participants: [],
  pictures: []
};

export const openRollsList: RollData[] = [
  rollData,
  rollData2,
  rollData,
  rollData2
];

export const userIdConnected = 7;
