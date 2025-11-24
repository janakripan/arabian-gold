import axios from "axios";

export const imageUploader = async ({ imageFile, imageClassification }) => {
  const formData = new FormData();
  formData.append("imageFiles", imageFile);
  const clientID =
    sessionStorage.getItem("clientID") || localStorage.getItem("clientID");

  const uploadUrl = "http://fileserver.sacrosys.net/api/1234/uploadImages";

  try {
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        Token:
          "w^0V6jJamvLyaBy5VEYQ2x4gzwrx5BifP6wjB/hQDNmDFSJ2//4.4oze&iJuiFrd",
        clientID: clientID,
        imageClassification: imageClassification,
      },
    });
    return response.data;
  } catch (error) {
    console.error("upload Error:", error);
    throw error;
  }
};

export const imageDeleter = async ({ filename, imageClassification }) => {
  const clientID =
    sessionStorage.getItem("clientID") || localStorage.getItem("clientID");
  const body = {
    fileNames: [filename],
  };
  const deleteUrl = "http://fileserver.sacrosys.net/api/1234/deleteImages";
  const headers = {
    Token: "w^0V6jJamvLyaBy5VEYQ2x4gzwrx5BifP6wjB/hQDNmDFSJ2//4.4oze&iJuiFrd",
    clientID: clientID,
    imageClassification: imageClassification,
  };
  try {
    const response = await axios.delete(deleteUrl, { data: body, headers });
    return response.data;
  } catch (error) {
    console.error("error deleting image:", error);
    throw error;
  }
};
