import { useState } from "react";

export default function usePhiAI() {
  const [phiMessage, setPhiMessage] = useState("Welcome to Easy GP!");
  
  const updatePhiMessage = (newMessage) => {
    setPhiMessage(newMessage);
  };

  return { phiMessage, updatePhiMessage };
}