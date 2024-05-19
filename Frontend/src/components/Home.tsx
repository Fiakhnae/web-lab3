import Navbar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface HomeProps {
  userId?: number;
}

function Home({ userId }: HomeProps) {
  const [seconds, setSeconds] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds]);

  const resetTimer = () => {
    setElapsedSeconds(seconds);
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      <Navbar></Navbar>
      {userId !== undefined ? (
        <main className="container mt-5 text-center">
          <h1>BusyBird Timer</h1>
          <div id="timerContainer" className="text-center">
            <p id="timer" className="display-1">
              {formatTime(seconds)}
            </p>
            <div id="timerButtons" className="mt-3">
              <button
                onClick={() => {
                  setIsActive(true);
                }}
                id="startButton"
                className={"btn mr-3 btn-primary"}
              >
                Start
              </button>
              <button
                onClick={() => {
                  setIsActive(false);
                }}
                id="pauseButton"
                className="btn btn-secondary mr-3"
              >
                Pause
              </button>
              <button
                onClick={() => {
                  resetTimer();
                }}
                id="stopButton"
                className="btn btn-danger"
              >
                Stop
              </button>
            </div>
          </div>
          <div id="previousSessions" className="mt-5">
            {elapsedSeconds !== undefined ? (
              <p>Пройдений час: {elapsedSeconds} с.</p>
            ) : null}
          </div>
        </main>
      ) : (
        <main className="container mt-5">
          <h1>BusyBird Timer</h1>
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Ви не авторизувалися!</p>
              <button id="stopButton" className="btn btn-primary">
                <Link className="nav-link" to="/login">
                  Ввійти
                </Link>
              </button>
              <button id="stopButton" className="btn btn-primary">
                <Link className="nav-link" to="/register">
                  Зареєструватися
                </Link>
              </button>
            </div>
          </div>
        </main>
      )}

      <Footer></Footer>
    </>
  );
}

export default Home;
