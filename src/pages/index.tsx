import type { NextPage } from 'next'
import {useEffect, useState} from "react";

const Home: NextPage = () => {
    const [randomNumber, setRandomNumber] = useState(0);
    const [numberCount, setNumberCount] = useState(0);
    const [time, setTime] = useState('00:00:00');
    const [startTime, setStartTime] = useState('00:00:00');
    const [isRunning, setIsRunning] = useState(false);

    const handleStart = async () => {
        const res = await fetch('/api/randomNumber').then(res => res.json())
            .catch(err => {
                console.log(err)
                throw new Error(err)
            });
        setRandomNumber(res.randomNumber);
        setIsRunning(true);
        setTime(new Date().toString());
        setStartTime(new Date().toString());
        setNumberCount(0);
    }

    useEffect(() => {
        if (isRunning && numberCount !== randomNumber) {
            const updateTime = setInterval(() => {
                setTime(new Date().toString());
            }, 1000);
            return () => clearInterval(updateTime);
        }
    }, [isRunning]);

    useEffect(() => {
        if (isRunning) {
            const updateToNumber = setInterval(() => {
                if (numberCount < randomNumber) {
                    const newNumber = parseFloat(String(numberCount + 0.001)).toFixed(3);
                    setNumberCount(Number(newNumber));
                }
                if (numberCount === randomNumber) {
                    handleStop();
                    clearInterval(updateToNumber);
                }
            }, 10);
            return () => clearInterval(updateToNumber);
        }
    }, );

    const handleStop = () => {
        setIsRunning(false);
    }

    const handleReset = () => {
        setIsRunning(false);
        setTime('00:00:00');
        setStartTime('00:00:00');
        setRandomNumber(0);
        setNumberCount(0);
    }

  return (
      <>
          <h1>Game of Crash</h1>
          <hr />
          <div>
              <h1>{numberCount}</h1>
              <p>Start time: {startTime}</p>
              <p>Finish Time: {time}</p>
              {isRunning ? <button onClick={handleStop}>Stop</button> : <button onClick={handleStart}>Start</button>}
              {isRunning ? <button onClick={handleReset}>Reset</button> : <button disabled>Reset</button>}
          </div>
          <progress value={numberCount} max={randomNumber} />
      </>
  )
}

export default Home;
