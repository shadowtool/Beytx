import React, { useState, useEffect } from "react";
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

  const [tags, setTags] = useState(Array.isArray(value) ? value : []);

  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
      setInputValue("");
    }
  };

  const addTag = (newTag) => {
    if (!tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="border border-solid border-gray-300 rounded-md flex flex-wrap gap-2 p-2">
        {tags.length === 0 ? (
          <div className="text-jet-black text-sm">
            {inputValue?.length > 0
              ? typingTagsBlockPlaceholder
              : emptyTagsBlockPlaceholder}
          </div>
        ) : (
          <>
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-green-600 text-white text-sm font-semibold px-1 py-1 pl-3 rounded-full"
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

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default MultiTagInput;
