import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import phiLogo from "../assets/phi-logo.png";

export default function PhiAssistant({ message }) {
  const [displayMessage, setDisplayMessage] = useState(message);

  useEffect(() => {
    setDisplayMessage(message);
  }, [message]);

  return (
    <motion.div className="phi-container">
      <motion.div className="chat-bubble">
        {displayMessage || "Hello, I'm Phi!"}
      </motion.div>
      <img src={phiLogo} alt="Phi AI" className="phi-logo" />
    </motion.div>
  );
}
  