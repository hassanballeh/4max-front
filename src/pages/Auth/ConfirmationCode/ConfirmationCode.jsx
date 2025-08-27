import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendCode, loginUser, checkCode } from "../../../back/auth";
import { useAuth } from "../../../context/AuthContext";

const ConfirmationCode = () => {
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();

  const { email, password, username } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isSendCode, setIsSendCode] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Countdown effect for resend cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleChange = async (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) {
      e.target.value = "";
      return;
    }

    // Move focus to next input
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // If last input filled → send code
    if (index === inputsRef.current.length - 1 && value) {
      const code = inputsRef.current.map((input) => input.value).join("");
      if (code.length === 6) {
        await handleSubmitCode(code);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmitCode = async (code) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await checkCode({ email, code });
      console.log("✅ Code verified:", res);
      const { access_token } = await loginUser(email, password);
      authLogin(access_token);
      localStorage.removeItem("username");
      navigate("/");
    } catch (err) {
      console.error("❌ Verification failed:", err);
      setError("This code isn't valid");
    } finally {
      setIsLoading(false);
    }
  };

  const handelSendCode = async () => {
    if (cooldown > 0) return; // prevent clicking during cooldown

    setError(null);
    setResendMessage("");
    setIsResending(true);

    try {
      const res = await sendCode({ email, username });
      console.log("✅ Code sent:", res);

      setIsSendCode(true);
      setResendMessage(`A new code has been sent to ${email}`);
      setCooldown(3600); // ⏳ 1 hour (3600 seconds)
    } catch (err) {
      console.error("❌ Failed to resend:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsResending(false);
    }
  };

  // Format cooldown into mm:ss or hh:mm:ss
  const formatCooldown = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}h ${m}m ${s}s`;
    }
    return `${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-3xl border border-black rounded-xl shadow-md p-6 sm:p-10 bg-white">
        <h4 className="text-2xl sm:text-3xl font-bold capitalize text-center mb-6">
          Enter the confirmation code
        </h4>

        {isSendCode && (
          <p className="text-center text-gray-600 mb-6">
            Code sent to <span className="font-semibold">{email}</span>
          </p>
        )}

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
              disabled={isLoading}
              className="w-12 h-12 text-center border-2 border-gray-400 rounded-lg text-lg focus:border-blue-500 outline-none disabled:bg-gray-200"
            />
          ))}
        </form>

        {/* Loading & error messages */}
        {isLoading && (
          <p className="text-center text-blue-500 mt-4">Verifying...</p>
        )}
        {error && <p className="text-center text-red-500 mt-2">{error}</p>}
        {resendMessage && (
          <p className="text-center text-green-600 mt-2">{resendMessage}</p>
        )}

        {/* Resend code section */}
        <div className="w-full flex justify-center mt-8">
          <p className="text-center text-base">
            Didn’t receive the confirmation code?{" "}
            <button
              type="button"
              disabled={isLoading || isResending || cooldown > 0}
              onClick={handelSendCode}
              className="text-black underline cursor-pointer disabled:opacity-50"
            >
              {isResending
                ? "Resending..."
                : cooldown > 0
                ? `Resend in ${formatCooldown(cooldown)}`
                : "Resend now"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCode;
