import React, { useEffect, useState } from "react";
import Coin from "./components/Coin";
import Axios from "axios";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  // Execute when page render
  useEffect(() => {
    // console.log("it works");
    // Axios.get() to fetch API data => .then(function to get api data)
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        // console.log(response.data);
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Bitcoin..."
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
          value={searchWord}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
