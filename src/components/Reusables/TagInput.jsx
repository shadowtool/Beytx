import React, { useState } from "react";
import { useController } from "react-hook-form";

const MultiTagInput = ({
  control,
  name,
  placeholder = "List skills.",
  emptyTagsBlockPlaceholder,
  typingTagsBlockPlaceholder,
}) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: [],
  });

  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
      setInputValue("");
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
      <div className="border border-solid border-gray-300 rounded-md flex flex-wrap gap-2 p-2">
        {value.length === 0 ? (
          <div className="text-jet-black  ">
            {inputValue.length > 0
              ? typingTagsBlockPlaceholder
              : emptyTagsBlockPlaceholder}
          </div>
        ) : (
          <>
            {value.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-green-600 text-white      px-1 py-1 pl-3 rounded-full"
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

        <input
          type="text"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
          placeholder={placeholder}
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500  ">{error.message}</p>}
    </div>
  );
};

export default MultiTagInput;
