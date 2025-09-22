import { cn } from "@/fsd/shared/utils/cn/cn";
import { motion } from "framer-motion";

interface IAnimatePoint {
  className?: string;
  isProblem?: boolean;
}

export const AnimatePoint = ({ className, isProblem }: IAnimatePoint) => {
  return (
    <motion.div
      className={cn(
        "rounded-full",
        isProblem ? "bg-hot" : "bg-success",
        className
      )}
      animate={{
        scale: [1, 1.6, 1],
        boxShadow: [
          "0 0 0px rgba(0,0,0,0)",
          `0 0 10px ${
            isProblem ? "rgba(239,68,68,0.8)" : "rgba(34,197,94,0.8)"
          }`,
          "0 0 0px rgba(0,0,0,0)",
        ],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
