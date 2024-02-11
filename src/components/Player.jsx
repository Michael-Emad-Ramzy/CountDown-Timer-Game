import { useState, useRef } from "react";

export default function Player() {
  //useRef is s hook allows you to persist values between render ,
  //it can be used to store a multible value that does not cause a re-render when updated.
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value='';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "Unknown"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
