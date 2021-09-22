import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, userName }) => {
  return (
    <div>
      <p className="f3 white">{`Hello ${userName}, I'll detect faces in your picture`}</p>
      <div className="center">
        <div className="blurred-box form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="form"
            onChange={onInputChange}
          ></input>
          <button
            className="w-30 grow f4 link ph3 pv2 dib white"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
