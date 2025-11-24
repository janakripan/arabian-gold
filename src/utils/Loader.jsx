import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gem, Coins, DollarSign } from "lucide-react";

const items = [
  { id: 1, Icon: Gem },
  { id: 2, Icon: Coins },
  { id: 3, Icon: DollarSign }
];

export const Loader = () => {
  const [positionsOrder, setPositionsOrder] = useState(["top", "left", "right"]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate positions → every icon moves to the next vertex
      setPositionsOrder(([a, b, c]) => [b, c, a]);
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  const side = 60;

  const positions = {
    top: { x: 0, y: -side * 0.6 },
    left: { x: -side * 0.5, y: side * 0.3 },
    right: { x: side * 0.5, y: side * 0.3 }
  };

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {items.map((item, index) => {
        const vertex = positionsOrder[index];
        const isTop = vertex === "top";

        return (
          <motion.div
            key={item.id}
            className="absolute flex items-center justify-center"
            animate={positions[vertex]}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <item.Icon
              className={isTop ? "text-golden" : "text-golden"}
              size={isTop ? 50 : 35}
              strokeWidth={isTop ? 2.5 : 2}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
