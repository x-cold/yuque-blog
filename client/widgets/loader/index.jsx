import React from 'react';

const containerStyle = {
  width: '100%',
  textAlign: 'center',
  paddingTop: '100px',
  height: '100vh',
};

const imageStyle = {
  display: 'inline-block',
  width: '60px',
  height: '60px',
};

export default function Loader() {
  return (
    <div style={containerStyle} className="loader">
      <img
        style={imageStyle}
        src="http://img.lanrentuku.com/img/allimg/1212/5-121204193955-51.gif"
        alt="Loading icon"
      />
    </div>
  );
}
