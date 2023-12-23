import { CancelIcon, LinkIcon } from "@/public/icons";
import { motion } from "framer-motion";
import { DescentButton, DescentClickAnimation } from "..";

interface IMenu {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const links = [
  {
    title: "Docs",
    link: "https://docs.descentdao.com",
  },

];

const MenuComponent = ({ isOpen, setIsOpen }: IMenu) => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={{
        duration: 1,
        // ease: "anticipate",
        type: "spring",
        stiffness: 60,
      }}
      className="fixed inset-0 bg-white-50 z-50 min-h-screen flex flex-col justify-between w-full py-10 px-6"
    >
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold text-grey-700">Menu</h4>
          <DescentClickAnimation onClick={() => setIsOpen(false)}>
            <CancelIcon />
          </DescentClickAnimation>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          {links.map((item, index) => (
            <DescentClickAnimation key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 flex justify-between items-center bg-white-300 border border-white-100 rounded-lg"
              >
                <div className="text-xs text-black-100">{item.title}</div>

                <LinkIcon />
              </a>
            </DescentClickAnimation>
          ))}
        </div>
      </div>

      <DescentButton variant="danger" text="Disconnect" />
    </motion.div>
  );
};

export default MenuComponent;
