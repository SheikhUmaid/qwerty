import React, { useEffect, useState } from "react";
import Button from "../Button";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const Hero = ({ onLearnMore }) => {
  const [Visible, setVisible] = useState(false);
  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await fetch(`${VITE_API_URL}/api/visible`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setVisible(data.isVisible);
      } catch (err) {
        console.log("Error getting count", err);
      }
    };
    const interval = setInterval(getCount, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="text-center sm:py-12 md:py-16">
      <h1 className="font-roboto mb-4 font-bold tracking-tight text-[3rem] sm:text-5xl md:text-7xl">
        QWERTY<span className="text-purple-400">.I/O</span>
      </h1>

      <p className="mx-auto mb-8 max-w-3xl text-center text-2xl font-semibold tracking-wide md:text-3xl">
        <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          “Bridging the Gap Between College Learning and Industry-Ready
          Technology”
        </span>
      </p>

      <div className="flex justify-center items-center gap-4">
        <Button
          variant="primary"
          onClick={() => {
            window.location.hash = "about-us";
          }}
        >
          Learn more
        </Button>

        {Visible && (
          <Button variant="secondary" onClick={onLearnMore}>
            Quiz →
          </Button>
        )}
      </div>
    </section>
  );
};

export default Hero;
