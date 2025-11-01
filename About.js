import React from "react";

const About = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">About</h1>

      <h2 className="text-lg font-medium text-gray-700 mb-2">Weather</h2>
      <p className="text-gray-600 mb-4">
        Microsoft Corporation<br />
        Version 4.54.63026.0
      </p>

      <ul className="list-disc pl-6 text-blue-600 space-y-2 mb-6">
        <li style={{ marginBottom: "12px" }}>
          <a
            href="https://www.microsoft.com/en-us/legal/intellectualproperty/copyright/default.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Microsoft software license terms
          </a>
        </li>
        <li style={{ marginBottom: "12px" }}>
          <a
            href="https://go.microsoft.com/fwlink/?LinkId=529038"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Third-party software acknowledgements
          </a>
        </li>
        <li style={{ marginBottom: "12px" }}>
          <a
            href="https://advertising.microsoft.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Microsoft Advertising
          </a>
        </li>
        <li style={{ marginBottom: "12px" }}>
          <a
            href="https://support.microsoft.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Help
          </a>
        </li>
      </ul>

      <p className="text-gray-600">
        © {new Date().getFullYear()} Microsoft Corporation. All rights reserved.
      </p>
    </div>
  );
};

export default About;
