import React from "react";
import ContactDialog from "../components/Contact/ContactDialog";
import FeedBackForm from "../components/Contact/FeedBackForm";

const ContactPage = () => {
  return (
    // Use grid to center the inner container
    <div className="relative w-full grid place-items-center min-h-screen">
      {/* This inner container holds your flex layout */}
      <div className="flex flex-col md:flex-row items-center">
        <ContactDialog />
        <div className="relative z-10 md:-ml-10 mt-8 md:mt-0">
          <FeedBackForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
