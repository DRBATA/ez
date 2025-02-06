import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePhiAI } from "../hooks/usePhiAI";
import { categories } from "../data/symptoms";

export default function SymptomChecker({ setAppState }) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const { getPhiQuestion, emergencyCheck } = usePhiAI();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-yellow-300 p-4 text-black">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="categories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-2xl font-bold">Select a Category</h1>
            <div className="flex space-x-4 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="p-6 text-xl bg-white shadow-lg rounded-lg"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setAppState("symptom-selection"); // Update App state
                    setStep(2);
                  }}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && selectedCategory && (
          <motion.div
            key="symptoms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-2xl font-bold">{selectedCategory.name} Symptoms</h1>
            <div className="flex flex-col space-y-2 mt-4">
              {selectedCategory.symptoms.map((symptom) => (
                <button
                  key={symptom}
                  className="p-4 bg-yellow-500 shadow-lg rounded-lg"
                  onClick={() => {
                    setSelectedSymptom(symptom);
                    setAppState("phi-asking"); // Phi now asks questions
                    setStep(3);
                  }}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
