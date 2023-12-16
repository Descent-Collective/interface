import classNames from "classnames";
import { useEffect, useState } from "react";
import { Input } from "./types";
import { DescentClickAnimation } from "..";

const DescentInput = (props: Input) => {
  const {
    type,
    disabled,
    label,
    labelAlt,
    name,
    placeholder,
    valid,
    max,
    valueAlt,
    value,
    onChange,
  } = props;

  const [valueText, setValue] = useState("");

  const handleOnChange = (value: string) => {
    const valueWithoutComma = value.replace(/,/g, "");

    if (valueWithoutComma.length === 0 || Number(valueWithoutComma) === 0) {
      setValue("");
      onChange && onChange("");
      return;
    }

    // Check if the input is a valid number (including decimals)
    const isMatch = valueWithoutComma.match(/^(\d+\.?\d*|\.\d+)$/);

    if (!isMatch) return;

    if (isNaN(Number(valueWithoutComma))) return;

    // Format the number with local thousand separators
    // Temporarily remove the decimal part to format the integer part
    const parts = valueWithoutComma.split(".");
    const integerFormatted = parseInt(parts[0]).toLocaleString();

    // Reconstruct the number including the decimal part if it exists
    const newValue =
      parts.length > 1 ? `${integerFormatted}.${parts[1]}` : integerFormatted;

    setValue(newValue);
    onChange && onChange(newValue);
  };

  useEffect(() => {
    if (value === "") setValue("");
  }, [value]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={name} className="text-[9px] md:text-xs">
          {label}
        </label>
        <div className="text-[9px] md:text-xs text-grey-500 font-medium">
          {labelAlt}
        </div>
      </div>
      <div
        className={classNames(
          "rounded-lg bg-white-300 border px-3 py-[5px] md:px-4 md:py-[15px] flex items-center justify-between",
          {
            "border-black-100": !disabled,
            "border-grey-850": disabled || !valid,
          }
        )}
      >
        <div>
          <input
            id={name}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            value={value || valueText}
            className={classNames(
              "border-none text-xs md:text-xl font-medium bg-transparent outline-none",
              {
                "text-black-100 placeholder:text-black-100": !disabled,
                "text-grey-500 placeholder:text-grey-500": disabled,
              }
            )}
            onChange={(e) => handleOnChange(e.target.value)}
          />
          {valueAlt && (
            <div className="text-grey-800 font-medium text-[8px] md:text-xs mt-1">
              ~ {valueAlt}
            </div>
          )}
        </div>

        {max && (
          <DescentClickAnimation onClick={() => handleOnChange(max)}>
            <div
              className={classNames(
                "py-1 px-[10px] bg-white-350 rounded text-[8px] md:text-xs cursor-pointer",
                {
                  "text-black-100": valid,
                  "text-grey-500": !valid,
                }
              )}
            >
              Max
            </div>
          </DescentClickAnimation>
        )}
      </div>
    </div>
  );
};

export default DescentInput;
