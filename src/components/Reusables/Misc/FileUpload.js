"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl"; // ✅ next-intl hook

const FileUpload = ({ name, placeholder }) => {
  const t = useTranslations("createPropertyPage"); // Scope translations to this namespace
  const { setValue, trigger, control } = useFormContext();
  const fileInputRef = useRef(null);

  const currentValue = useWatch({ control, name }) || [];

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    const newValue = [...currentValue, ...dropped];
    setValue(name, newValue);
    trigger(name);
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const newValue = [...currentValue, ...selected];
    setValue(name, newValue);
    trigger(name);
    e.target.value = null;
  };

  const handleRemove = (index) => {
    const newValue = currentValue.filter((_, i) => i !== index);
    setValue(name, newValue);
    trigger(name);
  };

  const isFile = (item) => typeof item !== "string";

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleClick}
        className="mt-1 block w-full h-28 px-4 py-12 border-2 border-dashed border-gray-300 rounded-md shadow-sm text-center cursor-pointer focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
      >
        <p className="text-gray-500">
          {placeholder || t("dragAndDropPlaceholderText")}
        </p>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {currentValue.map((item, index) => {
          const preview = isFile(item) ? URL.createObjectURL(item) : item;

          return (
            <div key={index} className="relative">
              <Image
                src={preview}
                alt={`Preview ${index}`}
                height={144}
                width={288}
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                title={t("removeImage") || "Remove"}
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FileUpload;
