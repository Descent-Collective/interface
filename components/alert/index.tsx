import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";

import { ErrorIcon, SuccessIcon } from "@/public/icons";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { useEffect, useState } from "react";

const DescentAlert = () => {
  const { alertState } = useSystemFunctions();

  const { alert, loading } = alertState;

  const variants = {
    initial: { x: "50%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "50%", opacity: 0 },
  };

  if (loading) {
    return <PendingView />;
  }

  return (
    alert?.title && (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ type: "tween", duration: 0.5 }}
        className={classNames(
          "flex p-3 md:p-6 gap-[10px] rounded-l-xl shadow-wide-box max-w-[90%] md:max-w-[444px] bg-white-50 fixed top-16 right-1 md:right-12 xl:right-[60px] z-[9999]",
          {
            "border-r-[8px] border-green-50": alert?.variant === "success",
            "border-r-[8px] border-red-50": alert?.variant === "error",
          }
        )}
      >
        <div className="w-10">
          {alert?.variant === "success" && <SuccessIcon />}
          {alert?.variant === "error" && <ErrorIcon />}
        </div>

        <div>
          <p className="text-black-100 text-sm md:text-lg font-semibold">
            {alert?.title}
          </p>

          <div className="text-xs md:text-sm font-medium text-grey-500 mt-2">
            {alert?.message}
          </div>
        </div>
      </motion.div>
    )
  );
};

const PendingView = () => {
  const [count, setCount] = useState(15);
  const variants = {
    initial: { x: "50%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "50%", opacity: 0 },
  };

  useEffect(() => {
    if (count === 0) return;

    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1500);

    return () => clearInterval(intervalId); // Clean up the interval
  }, [count]);

  if (count > 0) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ type: "tween", duration: 0.5 }}
        className="border-r-[6px] border-orange-300 flex p-3 rounded-l-xl shadow-wide-box max-w-[244px] bg-white-50 fixed top-20 md:top-24 right-1 md:right-12 xl:right-[60px] z-[9999]"
      >
        <div>
          <div className="flex justify-between items-center">
            <p className="text-black-100 text-xs md:text-sm font-semibold">
              Transaction in progress
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-xl font-medium text-blue-500">{count}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="text-[10px] md:text-xs font-medium text-grey-500 mt-1">
            You have a pending transaction. Please wait for confirmation!
          </div>
        </div>
      </motion.div>
    );
  }
};

export default DescentAlert;
