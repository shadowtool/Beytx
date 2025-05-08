import React from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";
import GeneralInput from "../Inputs/GeneralInput";

const MultiTagInput = ({
  name,
  placeholder = "List skills.",
  emptyTagsBlockPlaceholder,
  typingTagsBlockPlaceholder,
}) => {
  const { control, setValue } = useFormContext();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: [],
  });

  const inputFieldValue = useWatch({ name: `${name}-input`, control });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputFieldValue?.trim()) {
      e.preventDefault();
      addTag(inputFieldValue?.trim());
      setValue(`${name}-input`, "");
    }
  };

  const addTag = (newTag) => {
    if (!value.includes(newTag)) {
      onChange([...value, newTag]); // Directly update RHF
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove)); // Directly update RHF
  };

  return (
    <div className="flex flex-col w-full">
      <div className="border border-solid border-gray-300 rounded-md flex flex-wrap gap-2 px-4 py-2">
        {value.length === 0 ? (
          <div className="text-jet-black text-sm text-gray-400">
            {inputFieldValue?.length > 0
              ? typingTagsBlockPlaceholder
              : emptyTagsBlockPlaceholder}
          </div>
        ) : (
          <>
            {value.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-green-600 text-white px-1 py-1 pl-3 rounded-full"
              >
                <span className="mr-2">{tag}</span>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full bg-green-900 text-white min-h-6 max-h-6 min-w-6 max-w-6"
                  onClick={() => removeTag(tag)}
                >
                  x
                </button>
              </div>
            ))}
          </>
        )}

        <GeneralInput
          name={`${name}-input`}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
      </div>

      {error && <p className="text-red-500  ">{error.message}</p>}
    </div>
  );
};

export default MultiTagInput;
