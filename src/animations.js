export const menuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      delayChildren: 0.1,
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

export const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      type: "tween", // <- immediate movement
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    x: 0,
    transition: { duration: 0.2, type: "tween", ease: "easeInOut" },
  },
};
