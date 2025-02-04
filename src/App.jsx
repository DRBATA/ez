import React from 'react';

const App = () => {
  return (
    <div style={{ 
      backgroundColor: '#178FFF', 
      height: '100vh', 
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden' // 🚀 Ensures no scrolling inside the div
    }}>
      <h1 style={{ 
        color: 'white', 
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        EasyGP
      </h1>
    </div>
  );
};

export default App;
