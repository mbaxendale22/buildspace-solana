import React, { useEffect, useState } from 'react';
import './App.css';
import WalletConnected from './components/WalletConnected';
import { checkIfWalletIsConnected, connectWallet } from './helpers/auth';

// Constants

const TEST_GIFS = [
  'https://media.giphy.com/media/gk3R16JhLP8RUka2nD/giphy.gif',
  'https://media.giphy.com/media/DgLsbUL7SG3kI/giphy.gif',
  'https://media.giphy.com/media/cBIooxvKerol2/giphy.gif',
  'https://media.giphy.com/media/QWLtrEtGZEKsxjlPre/giphy.gif',
];

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet button"
      onClick={() => connectWallet(setWalletAddress)}
    >
      Connect to Wallet
    </button>
  );

  // have this function run on page load

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected(setWalletAddress);
    };
    window.addEventListener('load', onLoad);
    // wait until the page is loaded before running the function (recomended by Phantom)
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list');
      // call solana program here, this will fetch the data like a axios request

      //set gif list to state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            The Home of Rick & Morty GIFS in the metaverse
          </p>
          {/* Add the condition to show this only if we don't have a wallet address */}
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && (
            <WalletConnected
              inputValue={inputValue}
              setInputValue={setInputValue}
              gifList={gifList}
              setGifList={setGifList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
