import React, { useState, useEffect } from 'react';
import Question from './Question';
import { FaPlus } from 'react-icons/fa';

function AdminQuizBuilder() {
  // ✅ Load from localStorage right when state is initialized
  const [quizTitle, setQuizTitle] = useState(() => {
    const draft = localStorage.getItem('quizDraft');
    if (draft) {
      try {
        return JSON.parse(draft).title || '';
      } catch {
        return '';
      }
    }
    return '';
  });

  const [questions, setQuestions] = useState(() => {
    const draft = localStorage.getItem('quizDraft');
    if (draft) {
      try {
        return JSON.parse(draft).questions || [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [editingIndex, setEditingIndex] = useState(null);

  // ✅ Auto-save draft whenever title or questions change
  useEffect(() => {
    const quizData = { title: quizTitle, questions };
    localStorage.setItem('quizDraft', JSON.stringify(quizData));
  }, [quizTitle, questions]);

  // Add new blank question
  const handleAddQuestion = () => {
    setQuestions(prev => {
      const newQuestions = [
        ...prev,
        {
          inputType: "radio",
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer: ''
        }
      ];
      setEditingIndex(newQuestions.length - 1); // edit new one
      return newQuestions;
    });
  };

  const handleQuestionChange = (index, name, value) => {
    const updated = [...questions];
    updated[index][name] =
      typeof value === 'function' ? value(updated[index][name]) : value;

    if (name === "inputType") {
      updated[index].correctAnswer = value === "checkbox" ? [] : "";
    }

    setQuestions(updated);
  };

  const handleDelete = (index) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
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

  const handleSaveLocal = () => {
    const quizData = { title: quizTitle, questions };
    localStorage.setItem("quizDraft", JSON.stringify(quizData));
    alert("Draft saved locally!");
  };

  const handleSaveAndSet = async () => {
    if (!validateForm()) {
      alert("Please fill in all fields before saving to backend!");
      return;
    }

    const quizData = {
      title: quizTitle,
      questions: questions,
      active: true
    };

    try {
      const res = await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData)
      });

      if (res.ok) {
        alert("Quiz saved to backend!");
        localStorage.removeItem("quizDraft");
        setQuizTitle("");
        setQuestions([]);
        setEditingIndex(null);
      } else {
        alert("Failed to save quiz.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="flex flex-col justify-around min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto w-full">

        <h2 className="text-4xl mb-4">Enter Title</h2>
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
            onClick={handleSaveLocal}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-medium"
          >
            Save
          </button>
          <button
            onClick={handleSaveAndSet}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-medium"
          >
            Save & Set
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminQuizBuilder;
