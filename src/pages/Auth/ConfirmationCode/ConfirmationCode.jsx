import React from 'react';

const ConfirmationCode = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-3xl border border-black rounded-xl shadow-md p-6 sm:p-10 bg-white">
        
        
        <h4 className="text-2xl sm:text-3xl font-bold capitalize text-center mb-12">
          Enter the confirmation code
        </h4>

        
        <form className="w-full flex flex-col gap-5 items-center">
          <div className="w-full h-[47px] border-b-2 border-[#9d9d9d]">
            <input
              type="number"
              placeholder="Confirmation Code"
              required
              className="w-full h-full border-none outline-none text-base"
            />
          </div>
        </form>

        
        <div className="w-full flex justify-center mt-8">
          <p className="text-center text-base">
            Didn’t receive the confirmation code?{' '}
            <button
              type="button"
              onClick={() => alert('Code resent!')}
              className="text-[#5p86e5] underline cursor-pointer"
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
