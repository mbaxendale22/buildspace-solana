import React, { useState } from 'react';
import '../App.css';

const WalletConnected = ({ gifList, createGifAccount, handleGifSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const onInputChange = (e) => setInputValue(e.target.value);

  if (gifList === null) {
    return (
      <div className="connected-container">
        <button
          className="cta-button submit-gif-button"
          onClick={createGifAccount}
        >
          Do One-Time Initialization For GIF Program Account
        </button>
      </div>
    );
  } else {
    return (
      <div className="connected-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGifSubmit(inputValue, setInputValue);
          }}
        >
          <input
            type="text"
            placeholder="Enter gif link!"
            value={inputValue}
            onChange={onInputChange}
          />
          <button type="submit" className="cta-button submit-gif-button">
            Submit
          </button>
        </form>
        <div className="gif-grid">
          {gifList.map((item, index) => (
            <div className="gif-item" key={index}>
              <img src={item.gifLink} alt={item.gifLink} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default WalletConnected;
