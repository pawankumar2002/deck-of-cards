import './App.css';
import Card from './Card';
import { useState, useEffect } from 'react';

function App() {

  const [deckId, setDeckId] = useState("");
  const [remaining, setRemaining] = useState(52);
  const [imgUrl, setImgUrl] = useState("");

  const getDeck = async () => {
    try {
      const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/', {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      setDeckId(data.deck_id);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getDeck();
  }, [])


  const getCard = async () => {
    try {
      const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      setImgUrl(data.cards[0].image);
      setRemaining(data.remaining);

    } catch (error) {
      console.log(error);
    }
  }

  const addCard = () => {
    getCard();
  }

  return (
    <div className="App">
      <h1>Deck Of Cards</h1>
      <h2>Remaining : {remaining}</h2>
      <button onClick={addCard} id='btn'>+ Add</button>
      {remaining !== 52 ? <Card url={imgUrl} /> : <div></div>}
    </div>
  );
}

export default App;
