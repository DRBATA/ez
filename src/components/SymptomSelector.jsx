import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { categories, symptoms } from "../data/symptoms";
import usePhiAI from "../hooks/usePhiAI";

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [appMessage, setAppMessage] = useState("Welcome to Easy GP! Use gesture swipes or scroll to select a category and add symptoms to your diagnostic stack.");

  useEffect(() => {
    if (!selectedCategory) {
      setAppMessage("Welcome to Easy GP! Use gesture swipes or scroll to select a category and add symptoms to your diagnostic stack.");
    }
  }, [selectedCategory]);

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
    <div className="app-container">
      {!selectedCategory ? (
        <motion.div className="category-container">
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
                  onClick={() => setSelectedCategory(cat)}
                  animate={{ scale: 1.5, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {cat.emoji}
                </motion.div>
              )
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div className="symptom-container">
          <h2>{selectedCategory.name} Symptoms</h2>
          <motion.ul>
            {symptoms[selectedCategory.id].map((symptom) => (
              <motion.li
                key={symptom.id}
                className="symptom-item"
                onClick={() => setSelectedSymptom(symptom)}
              >
                {symptom.name}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </div>
  );
}
