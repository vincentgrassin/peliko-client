import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@env";

export const cloudinaryBaseUploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const getCloudinaryUrl = (publicId: string, quality = 90) => {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_${quality}/${publicId}.jpg`;
};

export const uploadToCloudinary = async (base64: string) => {
  const data = {
    file: `data:image/jpg;base64,${base64}`,
    upload_preset: CLOUDINARY_UPLOAD_PRESET,
  };
  const response = await fetch(cloudinaryBaseUploadUrl, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};
