import React from 'react';

const FaceRecognition = ({ imageURL }) => {
  return (
    <div className="ma center">
      <div className="absoolute mt2">
        <img src={imageURL} alt="" width="500px" height="auto"></img>
      </div>
    </div>
  );
};

export default FaceRecognition;
