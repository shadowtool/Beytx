import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const BedsFilterModal = () => {
  const { setValue, control } = useFormContext();

  const formValues = useWatch({ control: control });

  return (
    <div className="flex gap-4 flex-nowrap hide-scrollbar p-2 overflow-x-auto w-full h-fit py-8 px-6">
      {["studio", ...Array.from({ length: 7 }, (_, i) => i + 1)]?.map((el) => (
        <div
          className={`h-fit w-fit  border border-solid rounded-md shadow px-6 py-2 cursor-pointer min-w-fit transition-all duration-200 ${
            formValues?.beds === el
              ? "bg-green-100 border-green-600 text-green-600"
              : "bg-white border-white text-black"
          }`}
          onClick={() => {
            setValue("beds", el);
          }}
          key={el}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default BedsFilterModal;
