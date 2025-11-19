import React, { useState } from "react";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const FeedBackForm = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(`${VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage(data.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeShadow = 'shadow-[0_0_50px_rgba(126,34,206,0.8)] border-purple-400';
  const defaultShadow = 'shadow-[0_0_30px_rgba(126,34,206,0.4)] border-purple-500/30';

  return (
    <div
      className={`w-full max-w-[95vw] sm:max-w-md md:w-[450px] rounded-2xl mr-0 md:mr-28 p-4 sm:p-8 md:p-10 flex flex-col bg-[#04000D] ${isClicked ? activeShadow : defaultShadow} transition-all duration-300 ease-in-out cursor-pointer`}
      onClick={handleClick}
    >
      <h3 className="text-white text-center text-3xl font-semibold mb-10">
        Message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-8">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full bg-transparent border-b border-purple-500/40 text-white placeholder-gray-400 px-3 py-3 text-base focus:outline-none focus:border-purple-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full bg-transparent border-b border-purple-500/40 text-white placeholder-gray-400 px-3 py-3 text-base focus:outline-none focus:border-purple-400"
        />

        <textarea
          name="message"
          placeholder="Enter the message"
          rows="4"
          value={formData.message}
          onChange={handleInputChange}
          required
          className="w-full bg-transparent border-b border-purple-500/40 text-white placeholder-gray-400 px-3 py-3 text-base resize-none focus:outline-none focus:border-purple-400"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-md bg-[#A020F0] hover:bg-[#8e1dd9] active:bg-gradient-to-r active:from-purple-600 active:to-violet-500 text-white font-bold text-base transition-colors duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>

        {submitMessage && (
          <p className={`text-center text-sm ${submitMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
            {submitMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default FeedBackForm;
