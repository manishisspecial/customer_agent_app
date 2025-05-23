import React from 'react';
import { transitions } from '../styles/theme';

export const SlideTransition = ({ show, children, direction = 'right' }) => {
  const getTransformValue = () => {
    switch (direction) {
      case 'left':
        return show ? 'translateX(0)' : 'translateX(-100%)';
      case 'right':
        return show ? 'translateX(0)' : 'translateX(100%)';
      case 'up':
        return show ? 'translateY(0)' : 'translateY(-100%)';
      case 'down':
        return show ? 'translateY(0)' : 'translateY(100%)';
      default:
        return show ? 'translateX(0)' : 'translateX(100%)';
    }
  };

  return (
    <div
      className="transition-transform duration-300 ease-in-out"
      style={{
        transform: getTransformValue(),
        opacity: show ? 1 : 0,
        visibility: show ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export const FadeTransition = ({ show, children }) => {
  return (
    <div
      className="transition-opacity duration-300 ease-in-out"
      style={{
        opacity: show ? 1 : 0,
        visibility: show ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export const ScaleTransition = ({ show, children }) => {
  return (
    <div
      className="transition-all duration-300 ease-in-out"
      style={{
        transform: show ? 'scale(1)' : 'scale(0.95)',
        opacity: show ? 1 : 0,
        visibility: show ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>
  );
}; 