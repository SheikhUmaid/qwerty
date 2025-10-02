import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import QuizContext from "../../../context/QuizContext";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css"; // required by react-time-picker

function ShowAvailableQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(
    localStorage.getItem("selectedQuizId") || ""
  );
  const { setQuiz, setQuizActive, setEditQuizId, setTime } = useContext(QuizContext);
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);
  const [pendingQuiz, setPendingQuiz] = useState(null);
  const [timeInput, setTimeInput] = useState("00:05:00"); // default 5 min

  // Fetch quizzes
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/quizzes");
        const data = await res.json();
        setQuizzes(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  // Restore selected quiz
  useEffect(() => {
    if (!selectedQuizId || quizzes.length === 0) return;
    const savedQuiz = quizzes.find((q) => q._id === selectedQuizId);
    if (savedQuiz) {
      setQuiz(savedQuiz);
      setQuizActive(savedQuiz.isActive);
    }
  }, [selectedQuizId, quizzes]);

  // 🔹 Click handler
  const handleSetClick = (quiz) => {
    if (selectedQuizId === quiz._id) {
      // Directly deselect
      setSelectedQuizId("");
      localStorage.removeItem("selectedQuizId");
      setQuiz(null);
      setQuizActive(false);
      setTime(0); // reset time
    } else {
      setPendingQuiz(quiz);
      setShowDialog(true);
      setTimeInput("00:05:00"); // reset picker
    }
  };

  // 🔹 Confirm selection
  const confirmSetQuiz = () => {
    if (!pendingQuiz) return;

    // Convert HH:mm:ss → seconds
    const parts = timeInput.split(":").map(Number);
    let totalSeconds = 0;
    if (parts.length === 2) {
      totalSeconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    if (!totalSeconds || totalSeconds <= 0) {
      alert("Please select a valid time.");
      return;
    }

    setSelectedQuizId(pendingQuiz._id);
    localStorage.setItem("selectedQuizId", pendingQuiz._id);
    setQuiz(pendingQuiz);
    setQuizActive(pendingQuiz.isActive);
    setTime(totalSeconds); // 🔹 save in context

    setShowDialog(false);
    setPendingQuiz(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white px-6">
      {/* Header */}
      <div className="flex w-full justify-around items-center mb-10">
        <h1 className="text-2xl font-bold">Set Quiz</h1>
        <button
          onClick={() => navigate("/quiz/adminDashboard")}
          className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-500"
        >
          Go Back
        </button>
      </div>

      {/* Quiz Cards Grid */}
      {quizzes.length === 0 ? (
        <p className="text-gray-400 text-lg">No quizzes available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className={" bg-white text-black rounded-3xl p-8 shadow-lg flex flex-col items-center "}
            >
              <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
              <p className="mb-6 font-semibold">
                {quiz.questions?.length || 0} Questions
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => handleSetClick(quiz)}
                  className={`px-6 py-2 rounded-lg text-white ${
                    selectedQuizId === quiz._id
                      ? "bg-gray-500 hover:bg-gray-600"
                      : "bg-purple-600 hover:bg-purple-500"
                  }`}
                >
                  {selectedQuizId === quiz._id ? "Selected" : "Set"}
                </button>

                <button
                  onClick={() => {
                    setEditQuizId(quiz._id);
                    navigate("/quiz/editQuiz");
                  }}
                  className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Custom Dialog */}
      {showDialog && pendingQuiz && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black p-8 rounded-2xl shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Set Quiz Time</h2>
            <p className="mb-4">
              Select the time for <span className="font-semibold">{pendingQuiz.title}</span>:
            </p>

            {/* React Time Picker */}
            <TimePicker
              onChange={setTimeInput}
              value={timeInput}
              disableClock={true}
              format="HH:mm"
              className="mb-6 w-full border border-gray-300 rounded-lg"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmSetQuiz}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowAvailableQuizzes;
