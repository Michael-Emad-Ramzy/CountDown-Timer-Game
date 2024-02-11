import { useRef, useState } from "react";
import ResultModal from "./REsultModal";


export default function TimerChallenge({ title, targetTime }) {

  const [timeRemaining ,setTimeRemaining]= useState(targetTime *1000)
  const timer = useRef();
  const dialog = useRef();

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime *1000 ;


  if(timeRemaining <= 0){
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset(){
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining -10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
    <ResultModal remainingTime={timeRemaining} targetTime={targetTime} onReset={handleReset} ref={dialog}/>
    <section className="challenge">
      <h2>{title}</h2>
      <p className="shallenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? "Stop" : "Start"} challenge
        </button>
      </p>
      <p className={timerIsActive ? 'active' : undefined}>
        {timerIsActive ? "Time is running..." : "Timer inactive"}
      </p>
    </section>
    </>
  );
}
