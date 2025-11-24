import React from "react";

const ToggleSwitch = ({
  name,
  checked,
  onChange,
  label,
  activeColor = "bg-[#27C840]",
  inactiveColor = "bg-gray-300",
}) => {
  return (
    <div className="flex flex-col items-start gap-3">
      {label && (
        <label
          htmlFor={name}
          className="text-lg font-medium cursor-pointer select-none"
        >
          {label}
        </label>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex items-center h-6 w-14 rounded-full transition-colors duration-300 focus:outline-none ml-5 ${
          checked ? activeColor : inactiveColor
        }`}
      >
        <span
          className={`inline-block h-5.5 w-8.5 transform bg-white rounded-full shadow-md transition-transform duration-300 ${
            checked ? "translate-x-5.25" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
