import React, { useEffect, useState } from "react";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA installation");
      } else {
        console.log("User dismissed the PWA installation");
      }
      setDeferredPrompt(null);
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>EasyGP PWA</h1>
      {installable && (
        <button onClick={handleInstallClick} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          📥 Install EasyGP
        </button>
      )}
    </div>
  );
};

export default App;
