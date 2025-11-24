import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CgFileAdd } from "react-icons/cg";
import { FiUploadCloud } from "react-icons/fi";

const FileDropzone = ({ field, form }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        form.setFieldValue(field.name, acceptedFiles[0]); // update Formik state
      }
    },
    [form, field.name]
  );

  const file = form?.values?.[field.name]; // ✅ Safe optional chaining

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-2.5 text-center cursor-pointer transition ${
        isDragActive
          ? "border-golden bg-golden/40"
          : "border-gray-300 hover:border-golden/40"
      }`}
    >
      <input {...getInputProps()} />
      
      {file ? (
        <p className="text-sm text-gray-700 font-medium">{file.name}</p>
      ) : (
        <p className="text-sm text-gray-500">
         <CgFileAdd className="text-lg mx-auto text-golden " /> 
        </p>
      )}
    </div>
  );
};

export default FileDropzone;
