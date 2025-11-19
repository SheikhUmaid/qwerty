import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import Wait from "./Wait";
const VITE_API_URL = import.meta.env.VITE_API_URL;

function GetQuiz() {
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    let intervalId;

    async function fetchActiveQuizzes() {
      try {
        const response = await fetch(`${VITE_API_URL}/api/quizzes/active`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Check if quiz data has changed before updating state
        setQuiz((prevQuiz) => {
          const prevJson = JSON.stringify(prevQuiz);
          const newJson = JSON.stringify(data);
          return prevJson !== newJson ? data : prevQuiz;
        });

        console.log("Fetched quizzes:", data);
      } catch (err) {
        console.error("Error fetching active quizzes:", err);
      }
    }

    fetchActiveQuizzes(); // initial fetch

    intervalId = setInterval(fetchActiveQuizzes, 1000); // poll every 1 second

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <>
      {quiz && quiz.length > 0 ? (
        quiz.map((q, index) => <Quiz key={q._id || index} quiz={q} timeDuration={q.timeDuration}/>)
      ) : (
        <Wait />
      )}
    </>
  );
}

export default GetQuiz;
