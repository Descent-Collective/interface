import { motion } from "framer-motion";
import classNames from "classnames";

import { Button } from "./types";

const DescentButton = ({
  onClick,
  text,
  type = "button",
  disabled,
  loading,
  variant = "primary",
  icon,
}: Button) => {
  if (variant === "secondary") {
    return (
      <div className="relative w-full h-12 rounded-lg bg-black-100">
        <motion.button
          onClick={onClick}
          whileHover={{ top: 0, left: 0 }}
          whileTap={{ scale: 0.9 }}
          initial={{ top: "-9.5%", left: "-0.4%" }}
          transition={{ ease: "backOut" }}
          className={classNames(
            "absolute text-white-50 w-full h-full flex justify-center items-center bg-blue-50 border border-black-100 rounded-lg text-base",
            { "pointer-events-none": loading }
          )}
          disabled={disabled}
          type={type}
        >
          {text}
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}
      transition={{ ease: "backOut" }}
      className={classNames(
        "w-full rounded-lg flex justify-center items-center gap-1",
        {
          "pointer-events-none": loading || disabled,
          "bg-blue-100 h-9 md:h-12 text-black-50 text-sm md:text-base border border-black-100":
            variant === "primary",

          "bg-blue-100 h-9 md:h-12 text-black-50 text-sm md:text-base":
            variant === "primary-alt",

          "bg-transparent h-9 md:h-12 text-green-50 text-sm md:text-base border-[1.5px] border-green-500":
            variant === "accent",

          "bg-transparent h-9 md:h-12 text-red-50 text-sm md:text-base border-[1.5px] border-red-50":
            variant === "danger",

          "bg-transparent h-9 md:h-12 text-black-100 text-sm md:text-base border-[1.5px] border-black-100":
            variant === "info",

          "bg-black-150 h-9 md:h-12 text-blue-100 text-sm md:text-base":
            variant === "tertiary",

          "bg-green-100 text-white-50 text-[9px] md:text-xs h-[22px] md:h-7":
            variant === "action" && !disabled,

          "bg-grey-100 h-9 md:h-12 text-grey-50 border-none shadow-none":
            disabled,

          "h-[22px] md:h-7 text-[9px] md:text-xs":
            disabled && variant === "action",
        }
      )}
      disabled={disabled}
      type={type}
    >
      {text}

      {icon && icon}
    </motion.button>
  );
};

export default DescentButton;
