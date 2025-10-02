import React, { useState, useEffect, useContext } from "react";
import Question from "./Question";
import { FaPlus } from "react-icons/fa";
import QuizContext from "../../../context/QuizContext";
import { useNavigate } from "react-router-dom";

function EditQuizSection() {
  const { editQuizId } = useContext(QuizContext);
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Load quiz for editing
  useEffect(() => {
    const fetchQuizForEdit = async () => {
      if (!editQuizId) return;

      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/quizzes/${editQuizId}`);
        if (res.ok) {
          const quiz = await res.json();
          setQuizTitle(quiz.title);
          setQuestions(quiz.questions || []);
        }
      } catch (err) {
        console.error("Error fetching quiz for edit:", err);
      }
      setLoading(false);
    };

    fetchQuizForEdit();
  }, [editQuizId]);

  // Add new blank question
  const handleAddQuestion = () => {
    setQuestions((prev) => {
      const newQuestions = [
        ...prev,
        {
          inputType: "radio",
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          correctAnswer: "",
        },
      ];
      setEditingIndex(newQuestions.length - 1);
      return newQuestions;
    });
  };

  const handleQuestionChange = (index, name, value) => {
    const updated = [...questions];
    updated[index][name] =
      typeof value === "function" ? value(updated[index][name]) : value;

    if (name === "inputType") {
      updated[index].correctAnswer = value === "checkbox" ? [] : "";
    }

    setQuestions(updated);
  };

  const handleDelete = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const validateForm = () => {
    if (!quizTitle.trim()) return false;
    for (let q of questions) {
      if (
        !q.question.trim() ||
        !q.option1.trim() ||
        !q.option2.trim() ||
        !q.option3.trim() ||
        !q.option4.trim() ||
        (q.inputType === "radio" && !q.correctAnswer) ||
        (q.inputType === "checkbox" &&
          (!Array.isArray(q.correctAnswer) || q.correctAnswer.length === 0))
      ) {
        return false;
      }
    }
    return true;
  };

  const handleUpdateQuiz = async () => {
    if (!validateForm()) {
      alert("Please fill in all fields before saving!");
      return;
    }

    const quizData = {
      title: quizTitle,
      questions: questions,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/quizzes/${editQuizId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });

      if (res.ok) {
        alert("Quiz updated!");
        navigate("/quiz/availableQuiz"); // ✅ navigate back after update
      } else {
        alert("Failed to update quiz.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Server error. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        Loading quiz...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-around min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl mb-4">Edit Quiz</h2>

        <input
          type="text"
          className="w-full text-2xl p-3 mb-8 border border-purple-500 rounded bg-transparent"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />

        <div className="flex items-center mb-4">
          <h3 className="text-2xl mr-3">Questions</h3>
          <button
            onClick={handleAddQuestion}
            className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition"
          >
            <FaPlus className="text-white" />
          </button>
        </div>

        <div className="space-y-2 mb-8">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white text-black rounded px-4 py-2"
            >
              <span className="w-10">{idx + 1}</span>
              <span className="flex-1">{q.question || "Question preview"}</span>
              <button
                className="text-purple-600 font-semibold mr-4"
                onClick={() => setEditingIndex(idx)}
              >
                edit
              </button>
              <button
                className="text-red-500 font-semibold"
                onClick={() => handleDelete(idx)}
              >
                del
              </button>
            </div>
          ))}
        </div>

        {editingIndex !== null && (
          <Question
            index={editingIndex}
            data={questions[editingIndex]}
            onChange={handleQuestionChange}
          />
        )}

        <div className="flex gap-6 mt-10">
          <button
            onClick={handleUpdateQuiz}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-medium"
          >
            Update Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditQuizSection;
