import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader() {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        zIndex: 99,
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: '100%',
      }}
    >
      <span
        style={{
          textAlign: 'center',
          color: '#ffffff',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 35,
        }}
      >
        <CircularProgress size={100} thickness={7} />
      </span>
    </div>
  );
}
