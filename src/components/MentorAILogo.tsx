import React from 'react';

export const MentorAILogo: React.FC = () => {
  return (
    <svg width="200" height="110" viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          .text { font-family: Arial, sans-serif; font-weight: bold; }
          .mentor { fill: #1E293B; }
          .ai { fill: #0EA5E9; }
        `}
      </style>
      <text x="20" y="60" className="text mentor" fontSize="36">Mentor</text>
      <text x="140" y="60" className="text ai" fontSize="36">AI</text>
      <circle cx="30" cy="30" r="20" fill="#0EA5E9" opacity="0.1"/>
      <path d="M30 15C22.3 15 16 21.3 16 29C16 36.7 22.3 43 30 43C37.7 43 44 36.7 44 29C44 21.3 37.7 15 30 15ZM30 37C25.6 37 22 33.4 22 29C22 24.6 25.6 21 30 21C34.4 21 38 24.6 38 29C38 33.4 34.4 37 30 37Z" fill="#0EA5E9"/>
    </svg>
  );
}; 