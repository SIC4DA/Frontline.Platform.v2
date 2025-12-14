import { cloudinary } from "@/config/cloudnary";

export const extractPublicId = (url: string) => {
  const match = url.match(/upload\/\w+\/(.*?).\w+$/);
  if (!match) {
    return null;
  }
  return match[1];
};

export const uploadFile = async (file: File, options: { folder: string }) => {
  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const uploadedResponse = await cloudinary.uploader.upload(dataUri, {
    folder: options.folder,
    resource_type: "auto",
    format: "jpg",
    transformation: {
      fetch_format: "auto",
      quality: "auto",
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    },
  });

  return uploadedResponse;
};

export const uploadImageFromUrl = async (url: string, options: { folder: string }) => {
  const uploadedResponse = await cloudinary.uploader.upload(url, {
    folder: options.folder,
    resource_type: "auto",
    format: "jpg",
    transformation: {
      fetch_format: "auto",
      quality: "auto",
      width: 500,
      height: 500,
      crop: "limit",
    },
  });

  return uploadedResponse;
};

export const deleteFile = async (publicId: string) => {
  const deletedResponse = await cloudinary.uploader.destroy(publicId);
  return deletedResponse;
};
