import React from 'react';
import '../App.css';

const WalletConnected = ({
  inputValue,
  setInputValue,
  gifList,
  setGifList,
}) => {
  const onInputChange = (e) => setInputValue(e.target.value);

  const handleGifSubmit = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue('');
    } else {
      console.log('Empty input please try again.');
    }
  };
  return (
    <div className="connected-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGifSubmit();
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
        {gifList.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletConnected;
