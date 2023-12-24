import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Prompt = () => {
  const [count, setCount] = useState(7);
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
        className="border-r-[6px] border-orange-300 flex p-3 rounded-l-xl shadow-wide-box max-w-[274px] bg-white-50 fixed top-20 md:top-24 right-1 md:right-12 xl:right-[60px] z-[9999]"
      >
        <div>
          <div className="flex justify-between items-center">
            <p className="text-black-100 text-xs md:text-sm font-semibold">
              Account setup in progress
            </p>
          </div>

          <div className="text-[10px] md:text-xs font-medium text-grey-500 mt-1">
            If {"you're"} connected to your mobile wallet, please check your
            wallet to approve the transaction.
          </div>
        </div>
      </motion.div>
    );
  }
};

export default Prompt;
