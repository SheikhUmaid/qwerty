import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QuizContext from "../../../context/QuizContext";
const VITE_API_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const navigate = useNavigate();
  const { quiz, adminToggle, time, quizBtnVisible, quizActive, startStopQuiz } =
    useContext(QuizContext);

  const [count, setCount] = useState(0);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  // Convert seconds -> mm:ss
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Fetch waiting users count
  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await fetch(`${VITE_API_URL}/api/user/count`);
        const data = await res.json();
        setCount(data.userCount);
      } catch (err) {
        console.log("Error getting count", err);
      }
    };
    const interval = setInterval(getCount, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle start/stop quiz + timer
  const handleStartStop = () => {
    if (!quizActive) {
      // Starting quiz → reset timer
      setTimeLeft(time+2);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            startStopQuiz(); // auto-stop when timer hits 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Stopping quiz manually
      clearInterval(timerRef.current);
      setTimeLeft(0);
    }
    startStopQuiz();
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="min-h-screen flex flex-col items-center py-10 px-4 space-y-40">
        <h1 className="text-4xl font-semibold text-white">Admin page</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
          {/* Quiz Management */}
          <div className="bg-black border border-purple-600 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold">Quiz management</h2>
            <p className="text-sm text-gray-300">
              message indicating if there is any quiz questions present or not
            </p>
            <div className="space-y-3">
              <button
                className="w-full py-2 bg-white text-black rounded"
                onClick={() => navigate("/quiz/createQuiz")}
              >
                Create
              </button>
              <button
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded"
                onClick={() => navigate("/quiz/availableQuiz")}
              >
                Set Quiz
              </button>
              <button
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded"
                onClick={() => navigate("/quiz/viewResults")}
              >
                View Result
              </button>
            </div>
          </div>

          {/* Admin Toggle */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-10 flex items-center justify-between">
              <span className="text-black text-2xl font-medium">
                Quiz button toggle
              </span>
              <button
                onClick={quizBtnVisible}
                className={`w-16 h-8 flex items-center rounded-full p-1 duration-300 ${
                  adminToggle ? "bg-purple-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                    adminToggle ? "translate-x-8" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Start/Stop Selected Quiz */}
            <div className="bg-white rounded-xl p-8 space-y-5">
              <div className="flex flex-row justify-around gap-4 items-center">
                <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm">
                  {quiz?.title || "No quiz selected"}
                </span>
                <button
                  className={`px-4 py-1 ${
                    quizActive ? "bg-red-600" : "bg-green-600"
                  } text-white border rounded-4xl`}
                  onClick={handleStartStop}
                >
                  {quizActive ? "Stop" : "Start"}
                </button>
              </div>
              <div className="flex flex-row justify-around">
                <div className="text-black text-sm ml-2">
                  {count} people waiting
                </div>
                <div className="text-black text-sm ml-2">
                  {quizActive ? formatTime(timeLeft) : "Timer not running"}
                </div>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-purple-600 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold">Feedback</h2>
            <p className="text-sm text-white">
              message indicating if there is any feedback present or not
            </p>
            <button
              className="w-full py-2 bg-white text-black rounded"
              onClick={() => navigate("/quiz/viewFeedback")}
            >
              View
            </button>
          </div>

          {/* Events */}
          <div className="bg-purple-600 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold">Events</h2>
            <p className="text-sm text-white">
              message indicating if there is any details present or not
            </p>
            <button className="w-full py-2 bg-white text-black rounded"
            onClick={() => navigate("/quiz/eventManagement")}>
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
