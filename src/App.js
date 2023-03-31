import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [time, setTime] = useState(25 * 60);
  const [session, setSession] = useState(1);
   // eslint-disable-next-line 
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleStartClick = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= 1) {
          return prevTime - 1;
        }
        clearInterval(intervalRef.current);
        return prevTime;
      });
    }, 1000);
  };

  const handlePauseClick = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleResetClick = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(25 * 60);
    setSession(1);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="container">
        <h1 className="text-center">Pomodoro App</h1>
        <div id="timer-display" className="text-center">{formatTime(time)}</div>
        <div className="button-container d-flex justify-content-center mt-3">
        <div className="button-container">
        <button id="start-button" className="btn btn-danger mr-2 button" onClick={handleStartClick}>
          Start
        </button>
        <button id="pause-button" className="btn btn-secondary mr-2 button" onClick={handlePauseClick}>
          Pause
        </button>
        <button id="reset-button" className="btn btn-primary button" onClick={handleResetClick}>
          Reset
        </button>
      </div>

        </div>
        <div id="session-tracker" className="session-text text-center mt-3">
          Session: {session}
        </div>
      </div>
    </div>
  );
}

export default App;
