import React, { PropsWithChildren } from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
