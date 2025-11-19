// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CountdownTimer from './CountDownTimer';

// // 🔹 Helper to shuffle an array
// function shuffleArray(array) {
//   const arr = [...array];
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// }

// function Quiz({ quiz }) {
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [shuffledQuiz, setShuffledQuiz] = useState(null);

//   const navigate = useNavigate();

//   // 🔹 Shuffle questions + options ONCE when quiz loads
//   useEffect(() => {
//     if (quiz && quiz.questions) {
//       const shuffledQuestions = shuffleArray(quiz.questions).map(q => {
//         const options = shuffleArray([q.option1, q.option2, q.option3, q.option4]);
//         return { ...q, options };
//       });
//       setShuffledQuiz({ ...quiz, questions: shuffledQuestions });
//     }
//   }, [quiz]);

//   // 🔹 Detect tab switching
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         alert("Tab switch detected! You may be disqualified.");
//         setAnswers({});
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, []);

//   // 🔹 Block dev tools shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (
//         e.key === 'F12' ||
//         (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key)) ||
//         (e.ctrlKey && ['U', 'S', 'C'].includes(e.key))
//       ) {
//         e.preventDefault();
//       }
//     };
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   // 🔹 Disable right click
//   useEffect(() => {
//     const handleRightClick = (e) => {
//       e.preventDefault();
//     };
//     document.addEventListener("contextmenu", handleRightClick);
//     return () => document.removeEventListener("contextmenu", handleRightClick);
//   }, []);

//   // 🔹 Handle answer changes
//   const handleChange = (qIndex, value, type, isChecked) => {
//     setAnswers((prev) => {
//       if (type === "checkbox") {
//         const prevAnswers = prev[qIndex] || [];
//         if (isChecked) {
//           return { ...prev, [qIndex]: [...prevAnswers, value] };
//         } else {
//           return { ...prev, [qIndex]: prevAnswers.filter((v) => v !== value) };
//         }
//       } else {
//         return { ...prev, [qIndex]: value };
//       }
//     });
//   };

//   // 🔹 Submit quiz
//   const handleSubmit = async () => {
//     let sc = 0;

//     shuffledQuiz.questions.forEach((q, i) => {
//       const userAnswer = answers[i];

//       if (q.inputType === "radio") {
//         if (userAnswer === q.correctAnswer) {
//           sc++;
//         }
//       } else if (q.inputType === "checkbox") {
//         const correct = [...q.correctAnswer].sort();
//         const user = (userAnswer || []).sort();

//         if (
//           correct.length === user.length &&
//           correct.every((val, idx) => val === user[idx])
//         ) {
//           sc++;
//         }
//       }
//     });

//     setScore(sc);
//     setSubmitted(true);

//     try {
//       const user = JSON.parse(localStorage.getItem('user')); // must contain _id
//       if (!user) {
//         alert("User not found. Please login again.");
//         return;
//       }

//       const res = await fetch('${VITE_API_URL}/api/quizzes/submit', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           user: user,          // ✅ send only userId
//           quizId: shuffledQuiz._id,  // ✅ always send quizId
//           score: sc,
//           answers: answers,
//         }),
//       });

//       const data = await res.json();
//       console.log("Saved result:", data);

//       // Navigate only after successful save
//       navigate('/quiz/feedback');

//     } catch (err) {
//       console.error('Error submitting quiz:', err);
//     }
//   };

//   if (!shuffledQuiz) return null;

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-between bg-black-100 px-2 sm:px-6">
//       <div className="bg-black p-4 sm:p-6 rounded-lg w-full max-w-3xl mx-auto text-lg sm:text-2xl">
//         <h2 className="text-4xl text-white font-bold mb-4 text-center">{shuffledQuiz.title}</h2>
//         <CountdownTimer timeDuration={quiz.timeDuration} onTimeUp={handleSubmit} />
        
//         {shuffledQuiz.questions.map((q, i) => (
//           <div key={i} className="mb-6 border border-purple-500 p-4 rounded-3xl">
//             <div className='mb-5'>
//               <span className="font-semibold">{i+1}.{" "}</span>
//               <code className=' text-white break-words whitespace-pre-wrap'>{q.question}</code>
//             </div>
//             {q.options.map((opt, j) => {
//               const isSelected = 
//                 (q.inputType === "checkbox" && answers[i]?.includes(opt)) ||
//                 (q.inputType === "radio" && answers[i] === opt);
//               return (
//                 <div
//                   key={j}
//                   className={`border rounded-2xl my-3 p-4 cursor-pointer transition-colors duration-200 
//                     ${isSelected ? 'bg-purple-400 text-white border-purple-700' : 'border-purple-400'}`}
//                   onClick={() => handleChange(i, opt, q.inputType, !isSelected)}
//                 >
//                   <label className="block mt-1 cursor-pointer">
//                     <input
//                       type={q.inputType}
//                       name={q.inputType === 'radio' ? `question-${i}` : `option-${i}-${j}`}
//                       value={opt}
//                       onChange={(e) => handleChange(i, opt, q.inputType, e.target.checked)}
//                       disabled={submitted}
//                       checked={isSelected}
//                       className="mr-2 w-5 h-5 accent-purple-600"
//                     />
//                     {opt}
//                   </label>
//                 </div>
//               );
//             })}
//           </div>
//         ))}

//         {!submitted && (
//           <div className="flex justify-center mt-4">
//             <button
//               className="bg-purple-500 text-white px-4 py-2 rounded"
//               onClick={handleSubmit}
//             >
//               Submit
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Quiz;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from './CountDownTimer';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// 🔹 Helper to shuffle an array
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Quiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledQuiz, setShuffledQuiz] = useState(null);

  const navigate = useNavigate();

  // 🔹 Shuffle questions + options ONCE when quiz loads
  useEffect(() => {
    if (quiz && quiz.questions) {
      const shuffledQuestions = shuffleArray(quiz.questions).map(q => {
        const options = shuffleArray([q.option1, q.option2, q.option3, q.option4]);
        return { ...q, options };
      });
      setShuffledQuiz({ ...quiz, questions: shuffledQuestions });
    }
  }, [quiz]);

  // 🔹 Detect tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Tab switch detected! You may be disqualified.");
        setAnswers({});
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // 🔹 Block dev tools shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key)) ||
        (e.ctrlKey && ['U', 'S', 'C'].includes(e.key))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 🔹 Disable right click
  useEffect(() => {
    const handleRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleRightClick);
    return () => document.removeEventListener("contextmenu", handleRightClick);
  }, []);

  // 🔹 Handle answer changes
  const handleChange = (qIndex, value, type, isChecked) => {
    setAnswers((prev) => {
      if (type === "checkbox") {
        const prevAnswers = prev[qIndex] || [];
        if (isChecked) {
          return { ...prev, [qIndex]: [...prevAnswers, value] };
        } else {
          return { ...prev, [qIndex]: prevAnswers.filter((v) => v !== value) };
        }
      } else {
        return { ...prev, [qIndex]: value };
      }
    });
  };

  // 🔹 Submit quiz
  const handleSubmit = async () => {
    let sc = 0;

    shuffledQuiz.questions.forEach((q, i) => {
      const userAnswer = answers[i];

      if (q.inputType === "radio") {
        if (userAnswer === q.correctAnswer) sc++;
      } else if (q.inputType === "checkbox") {
        const correct = [...q.correctAnswer].sort();
        const user = (userAnswer || []).sort();

        if (
          correct.length === user.length &&
          correct.every((val, idx) => val === user[idx])
        ) sc++;
      }
    });

    setScore(sc);
    setSubmitted(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert("User not found. Please login again.");
        return;
      }

      const res = await fetch(`${VITE_API_URL}/api/quizzes/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: user,
          quizId: shuffledQuiz._id,  // ✅ Always send quizId
          score: sc,
          answers: answers,
        }),
      });

      const data = await res.json();
      console.log("Saved result:", data);

      // ✅ Send quizId to Feedback page
      navigate('/quiz/feedback', {
        state: { quizId: shuffledQuiz._id }
      });

    } catch (err) {
      console.error('Error submitting quiz:', err);
    }
  };

  if (!shuffledQuiz) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-black-100 px-2 sm:px-6">
      <div className="bg-black p-4 sm:p-6 rounded-lg w-full max-w-3xl mx-auto text-lg sm:text-2xl">
        <h2 className="text-4xl text-white font-bold mb-4 text-center">{shuffledQuiz.title}</h2>
        <CountdownTimer timeDuration={quiz.timeDuration} onTimeUp={handleSubmit} />

        {shuffledQuiz.questions.map((q, i) => (
          <div key={i} className="mb-6 border border-purple-500 p-4 rounded-3xl">
            <div className='mb-5'>
              <span className="font-semibold">{i + 1}.{" "}</span>
              <code className='text-white break-words whitespace-pre-wrap'>{q.question}</code>
            </div>

            {q.options.map((opt, j) => {
              const isSelected =
                (q.inputType === "checkbox" && answers[i]?.includes(opt)) ||
                (q.inputType === "radio" && answers[i] === opt);

              return (
                <div
                  key={j}
                  className={`border rounded-2xl my-3 p-4 cursor-pointer transition-colors duration-200 
                    ${isSelected ? 'bg-purple-400 text-white border-purple-700' : 'border-purple-400'}`}
                  onClick={() => handleChange(i, opt, q.inputType, !isSelected)}
                >
                  <label className="block mt-1 cursor-pointer">
                    <input
                      type={q.inputType}
                      name={q.inputType === 'radio' ? `question-${i}` : `option-${i}-${j}`}
                      value={opt}
                      onChange={(e) => handleChange(i, opt, q.inputType, e.target.checked)}
                      disabled={submitted}
                      checked={isSelected}
                      className="mr-2 w-5 h-5 accent-purple-600"
                    />
                    {opt}
                  </label>
                </div>
              );
            })}
          </div>
        ))}

        {!submitted && (
          <div className="flex justify-center mt-4">
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
