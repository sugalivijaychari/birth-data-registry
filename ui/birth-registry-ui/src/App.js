import React, { useState } from 'react';
import './App.css';
import BirthData from './BirthData';
import QueryPage from './QueryPage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  let activeComponent = null;
  switch (activeTab) {
    case 'birthdata':
      activeComponent = <BirthData />;
      break;
    case 'query':
      activeComponent = <QueryPage />;
      break;
    default:
      activeComponent = (
        <div className="home-container">
          <h1>Welcome to Birth registry implementation using Hyperledger Fabric</h1>
        </div>
      );
      break;
  }

  return (
    <div className="home-menu">
      <nav className="navbar">
        <ul>
          <li className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>
            Home
          </li>
          <li className={activeTab === 'birthdata' ? 'active' : ''} onClick={() => handleTabClick('birthdata')}>
            Set Birth Data
          </li>
          <li className={activeTab === 'query' ? 'active' : ''} onClick={() => handleTabClick('query')}>
            Query Birth Data
          </li>
        </ul>
      </nav>
      {activeComponent}
    </div>
  );
}

export default App;
