import React from 'react';
import Button from '../Button';
import teamPhoto from '/images/workshops/about.png';
import codingIllustration from '../../assets/coding.svg';

const About = ({ onLearnMore }) => {
    return (
        // Section container with responsive flex layout
        <section className="flex flex-col items-center gap-12 py-20 md:py-28 lg:flex-row lg:items-start">

            {/* --- LEFT COLUMN (Text and Photo) --- */}
            <div className="w-full max-w-lg flex-1 lg:max-w-none">
                <p className="mb-8 text-lg leading-relaxed text-gray-300 md:text-xl">
                    "Empowering students to innovate, collaborate, and turn ideas into reality - QWERTY.I/O is where curiosity meets action."
                </p>
                <img
                    src={teamPhoto}
                    alt="Team collaborating on a project"
                    className="w-full rounded-2xl object-cover shadow-lg"
                />
            </div>

            {/* --- RIGHT COLUMN (Illustration, Stats, and Button) --- */}
            <div className="flex w-full max-w-lg flex-1 flex-col items-center lg:max-w-none">
                <img
                    src={codingIllustration}
                    alt="Woman coding illustration"
                    className="mb-8 w-full max-w-sm hidden lg:block"
                />

                {/* Stats Section */}
                <div className="mb-10 flex gap-12">
                    <div className="text-center">
                        <span className="block text-5xl font-bold">50+</span>
                        <span className="text-gray-400">members</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-5xl font-bold">5</span>
                        <span className="text-gray-400">years</span>
                    </div>
                </div>

                {/* Use the onLearnMore prop for navigation */}
                <Button
                    variant="primary"
                    onClick={onLearnMore}
                >
                    Show More
                </Button>
            </div>
        </section>
    );
};

export default About;