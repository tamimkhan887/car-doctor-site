import React from 'react';
import person from "../../../assets/images/about_us/person.jpg";
import parts from "../../../assets/images/about_us/parts.jpg";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-10 mt-16 lg:mt-20 px-4 sm:px-6 md:px-10 lg:px-16">
      
      <div className="w-full lg:w-1/2 relative flex justify-center">
        <div className="relative w-full max-w-md lg:max-w-lg">
          <img
            src={person}
            alt="Person"
            className="w-[85%] sm:w-[80%] md:w-[75%] rounded-lg shadow-2xl"
          />
          <img
            src={parts}
            alt="Parts"
            className="absolute bottom-[-30px] right-0 sm:right-4 md:right-0 w-32 sm:w-40 md:w-52 lg:w-64 rounded-xl border-4 sm:border-6 lg:border-8 border-white shadow-xl"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5 lg:space-y-6 text-center lg:text-left">
        <p className="text-[#FF3811] font-bold text-lg sm:text-xl">About Us</p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug">
          We are qualified & of experience in this field
        </h1>

        <p className="text-[#737373] text-sm sm:text-base leading-7">
          There are many variations of passages of Lorem Ipsum available, but the
          majority have suffered alteration in some form, by injected humour, or
          randomised words which don't look even slightly believable.
        </p>

        <p className="text-[#737373] text-sm sm:text-base leading-7">
          The majority have suffered alteration in some form, by injected humour,
          or randomised words which don't look even slightly believable.
        </p>

        <button className="bg-[#FF3811] text-base sm:text-lg font-semibold text-white px-5 sm:px-6 py-3 rounded-lg">
          Get More Info
        </button>
      </div>
    </div>
  );
};

export default About;