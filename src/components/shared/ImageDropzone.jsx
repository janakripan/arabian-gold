import { useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { imageDeleter, imageUploader } from "../../utils/imageUploader";
import { useDropzone } from "react-dropzone";
import { IoIosCloseCircle } from "react-icons/io";
import { FiFilePlus } from "react-icons/fi";

const ImageDropzone = ({ name, imageClassification }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [isWindowDragActive, setIsWindowDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadFilename, setUploadFilename] = useState(null);
  let dragCounter = 0;

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const imageFile = acceptedFiles[0];
    setUploading(true);

    const uploadResult = await imageUploader({
      imageFile,
      imageClassification,
    });
    setUploading(false);

    //handle success
    if (
      uploadResult?.FileDetails &&
      Array.isArray(uploadResult.FileDetails) &&
      uploadResult.FileDetails.length > 0
    ) {
      const fileInfo = uploadResult.FileDetails[0];
      setFieldValue(name, fileInfo.FileUrl);
      setUploadFilename(fileInfo.Filename);
      setPreviewUrl(URL.createObjectURL(imageFile));
      setIsWindowDragActive(false);
      return;
    }
    alert("image upload failed. please check and retry");
    setIsWindowDragActive(false);
  };

  const handleRemoveImage = async () => {
    if (!uploadFilename) {
      console.warn("no filename available for deletion");
      return;
    }

    try {
      await imageDeleter({
        filename: uploadFilename,
        imageClassification,
      });

      // clear preview only aftr successfull deletion
      setFieldValue(name, null);
      setPreviewUrl(null);
      setUploadFilename(null);
    } catch {
      alert("failed to remove image from server");
    }
  };

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  useEffect(() => {
    const handleDragEnter = (e) => {
      e.preventDefault();
      dragCounter++;
      setIsWindowDragActive(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) setIsWindowDragActive(false);
    };

    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
      e.preventDefault();
      dragCounter = 0;
      setIsWindowDragActive(false);
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  useEffect(() => {
    // if there is a field value and no filename yet , extract filename from URL
    if (field.value && !uploadFilename) {
      const urlParts = field.value.split("/");
      const filenameFromUrl = urlParts[urlParts.length - 1];
      setUploadFilename(filenameFromUrl);
      setPreviewUrl(field.value);
    }
  }, [field.value, uploadFilename]);

  return (
    <>
      <div
        {...getRootProps()}
        className={`w-full h-full min-h-[25px] p-2 border-2 border-dashed flex items-center justify-center rounded-lg cursor-pointer ${
          field.value ? "border-golden" : "border-[#404040]"
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p className="text-primary text-xs ">uploading . . .</p>
        ) : field.value ? (
          <div className="text-center text-xs text-golden text-shadow-lg border border-primary p-1 relative">
            <img
              src={previewUrl || field.value}
              alt="preview"
              className="w-20 h-20 object-cover mx-auto mb-2 rounded"
            />

            <p className=" wrap-break-word max-w-[80px] turncate ">
              {field.value.split("/").pop()}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute top-0 right-0 mt-1 mr-1 text-red-500 hover:text-red-700"
            >
              <IoIosCloseCircle />
            </button>
          </div>
        ) : (
          <div className="text-golden text-[24px]">
            <FiFilePlus />
          </div>
        )}
        {meta.touched&&meta.error&&(
            <div className="text-red-500 text-xs mt-1">{meta.error}</div>
        )}
      </div>
      {isWindowDragActive&&(
        <div {...getRootProps()} className="fixed inset-0 z-50 bg-golden/40 flex items-center justify-center border-4 border-dashed border-primary">
            <input  {...getInputProps()} />
            <p className="capitalize text-primary text-xl font-semibold"> drop file to upload</p>
        </div>
      )}
    </>
  );
};

export default ImageDropzone;
