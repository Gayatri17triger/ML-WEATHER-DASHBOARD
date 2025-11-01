
import React from "react";
import "./PrivacyTab.css";

export default function Settings() {
  return (
    <div className="settings-container">
      <div className="content privacy-content">
        <h2>Microsoft Privacy Statement</h2>
        <p><strong>Last Updated:</strong> September 2025</p>
        <p>
          Your privacy is important to us. This privacy statement explains the personal data Microsoft processes,
          how Microsoft processes it, and for what purposes.
        </p>
        <ul>
          <li>Personal data we collect</li>
          <li>How we use personal data</li>
          <li>Reasons we share personal data</li>
          <li>How to access and control your personal data</li>
          <li>Cookies and similar technologies</li>
          <li>Microsoft account</li>
        </ul>
      </div>
    </div>
  );
}
