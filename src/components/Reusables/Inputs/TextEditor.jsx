import React from "react";
import dynamic from "next/dynamic";
import { useFormContext, Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = ({ name, placeholder, rules = {} }) => {
  const { control } = useFormContext();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ direction: "rtl" }], // this is rtl support
    ],
  };

  return (
    <div className="mb-4">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <ReactQuill
            {...field}
            placeholder={placeholder}
            theme="snow"
            modules={modules}
            className="h-full min-h-52 text-black border-2 border-solid border-gray-200 rounded-2xl p-1 ! "
          />
        )}
      />
    </div>
  );
};

export default TextEditor;
