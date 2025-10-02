import { useState, useEffect } from "react";
import QuizContext from "./QuizContext";

const QuizContextProvider = ({ children }) => {
  const [adminToggle, setAdminToggle] = useState(false); // UI toggle
  const [quiz, setQuiz] = useState(null);   
  const [time, setTime]=useState("300")  //in seconds            
  const [quizActive, setQuizActive] = useState(false);    
  const [editQuizId,setEditQuizId]=useState(null)

  // 🔹 Fetch initial quiz button visibility from backend
  useEffect(() => {
    const fetchVisibility = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/visible");
        const data = await res.json();
        setAdminToggle(data.isVisible);  // ✅ keep UI in sync with backend
      } catch (err) {
        console.error("Error fetching visibility:", err);
      }
    };
    fetchVisibility();
  }, []);

  // Start/Stop selected quiz
  const startStopQuiz = async () => {
    if (!quiz?._id) {
      alert("No quiz selected!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/quizzes/toggle/${quiz._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body : JSON.stringify({time : time}),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setQuizActive(data.isActive);
      setQuiz((prev) => ({ ...prev, isActive: data.isActive }));
    } catch (err) {
      console.error("Error toggling quiz:", err);
    }
  };

  // Quiz button visibility toggle
  const quizBtnVisible = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/visible", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setAdminToggle(data.isVisible); // ✅ update state
    } catch (err) {
      console.error("Error toggling quiz:", err);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        adminToggle,
        quizBtnVisible,
        quiz,
        setQuiz,
        quizActive,
        setQuizActive,
        startStopQuiz,
        time,
        setTime,
        setEditQuizId,
        editQuizId,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContextProvider;
