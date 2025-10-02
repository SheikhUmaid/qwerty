import React from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';

const ContactDialog = () => {
    return (
        <div className="w-full max-w-[95vw] sm:max-w-md md:max-w-lg bg-gradient-to-br border border-white/20 rounded-xl mt-8 px-4 py-8 sm:px-12 sm:py-12 md:px-24 md:py-20 flex flex-col justify-center shadow-lg">
            
            {/* Heading */}
            <h2 className="text-5xl font-bold mb-4">
                <span className="text-[#7E22CE]">Contact</span>{" "}
                <span className="text-white">us</span>
            </h2>

            {/* Subtext */}
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
            “Have questions or feedback? Reach out to us and our team will get back to you promptly.”
            </p>

            {/* Contact Info */}
            <div className="space-y-5">
                <div className="flex items-center gap-3">
                    <FiMail className="text-lg text-[#7E22CE]" />
                    <span className="text-gray-200 text-sm">
                        :- <a href="mailto:qwertyio.sdm@gmail.com" className="underline">qwertyio.sdm@gmail.com</a>
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <FiPhone className="text-lg text-[#7E22CE]" />
                    <span className="text-gray-200 text-sm">
                        :- +91 8277345645
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ContactDialog;
