// src/pages/ContactPage.jsx
import React from "react";
import ContactDialog from "../components/Contact/ContactDialog";
import FeedbackForm from "../components/Contact/FeedBackForm";

const ContactPage = () => {
  return (
    // Use grid to center the inner container
    <div className="relative w-full grid place-items-center min-h-screen">
      {/* This inner container holds your flex layout */}
      <div className="flex items-center">
        <ContactDialog />
        <div className="relative z-10 -ml-10">
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;