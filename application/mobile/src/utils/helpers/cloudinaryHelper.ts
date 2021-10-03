import { CLOUDINARY_CLOUD_NAME } from "@env";

export const getCloudinaryUrl = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}.jpg`;
