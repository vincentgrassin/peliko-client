import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL
} from "@env";

export const getCloudinaryUrl = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}.jpg`;

export const uploadToCloudinary = async (base64: string) => {
  const data = {
    file: `data:image/jpg;base64,${base64}`,
    upload_preset: CLOUDINARY_UPLOAD_PRESET
  };
  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    },
    method: "POST"
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};
