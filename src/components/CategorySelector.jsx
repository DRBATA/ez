import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { categories } from "../data/symptoms";
import usePhiAI from "../hooks/usePhiAI";

export default function CategorySelector({ setAppMessage }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setAppMessage("Welcome to Easy GP! Use gesture swipes or scroll to select a category and add symptoms to your diagnostic stack.");
  }, [setAppMessage]);

  const handleScroll = (direction) => {
    setSelectedIndex((prevIndex) => {
      let newIndex = prevIndex + direction;
      if (newIndex < 0) newIndex = categories.length - 1;
      if (newIndex >= categories.length) newIndex = 0;
      return newIndex;
    });
  };

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.deltaY < 0) {
        handleScroll(-1);
      } else if (event.deltaY > 0) {
        handleScroll(1);
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="category-container">
      <motion.div
        className="category-list"
        drag="y"
        dragConstraints={{ top: -50, bottom: 50 }}
        onDragEnd={(event, info) => {
          if (info.offset.y < -30) {
            handleScroll(1);
          } else if (info.offset.y > 30) {
            handleScroll(-1);
          }
        }}
      >
        {categories.map((cat, index) => (
          index === selectedIndex && (
            <motion.div
              key={cat.id}
              className="category-item selected large-icon glow-effect"
              onClick={() => setAppMessage(`Selected category: ${cat.name}`)}
              animate={{ scale: 1.5, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {cat.emoji}
            </motion.div>
          )
        ))}
      </motion.div>
    </div>
  );
}