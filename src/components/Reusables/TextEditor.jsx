import React from "react";
import dynamic from "next/dynamic";
import { useFormContext, Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = ({ name, placeholder }) => {
  const { control } = useFormContext();

  return (
    <div className="mb-4">
      <Controller
        name={name}
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field }) => (
          <ReactQuill
            {...field}
            placeholder={placeholder}
            theme="snow"
            className="h-full min-h-52 text-black border-2 border-solid border-gray-200 rounded-2xl p-1 !text-sm"
          />
        )}
      />
    </div>
  );
};

export default TextEditor;
