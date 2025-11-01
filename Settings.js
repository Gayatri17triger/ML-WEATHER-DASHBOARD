import React, { useState } from 'react';
import './Settings.css'; // optional for styling
import GeneralTab from './GeneralTab'; // ✅ Import the actual GeneralTab component
import PrivacyTabs from "./PrivacyTabs";
import Terms from "./Terms";
import Credits from "./Credits";
import About from "./About";
const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralTab />; // ✅ Show full GeneralTab here
      case 'privacy':
        return <PrivacyTabs />;
      case 'terms':
        return <Terms />;
      case 'credits':
        return <Credits />;
      case 'about':
        return <About />;
      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="subnavbar">
        <button onClick={() => setActiveTab('general')} className={activeTab === 'general' ? 'active' : ''}>
          General
        </button>
        <button onClick={() => setActiveTab('privacy')} className={activeTab === 'privacy' ? 'active' : ''}>
          Privacy Statement
        </button>
        <button onClick={() => setActiveTab('terms')} className={activeTab === 'terms' ? 'active' : ''}>
          Terms of Use
        </button>
        <button onClick={() => setActiveTab('credits')} className={activeTab === 'credits' ? 'active' : ''}>
          Credits
        </button>
        <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>
          About
        </button>
      </div>

      <div className="settings-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;
