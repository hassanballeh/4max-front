import React, { useRef } from 'react';

const ConfirmationCode = () => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    
    if (/[^0-9]/.test(value)) {
      e.target.value = "";
      return;
    }

  
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-3xl border border-black rounded-xl shadow-md p-6 sm:p-10 bg-white">
        <h4 className="text-2xl sm:text-3xl font-bold capitalize text-center mb-12">
          Enter the confirmation code
        </h4>

        {/* Six digit code inputs */}
        <form className="w-full flex justify-center gap-3">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              ref={(el) => (inputsRef.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-12 h-12 text-center border-2 border-gray-400 rounded-lg text-lg focus:border-blue-500 outline-none"
            />
          ))}
        </form>

        {/* Resend code section */}
        <div className="w-full flex justify-center mt-8">
          <p className="text-center text-base">
            Didn’t receive the confirmation code?{" "}
            <button
              type="button"
              onClick={() => alert("Code resent!")}
              className="text-blue-600 underline cursor-pointer"
            >
              Resend now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCode;
