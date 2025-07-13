import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { axiosInstance } from "../../lib/axios";
import { FaSpinner } from "react-icons/fa";

const ResetPassword = ({ userData, isBigScreen }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const translate = useTranslations("resetPassword");

  const handleSendOTP = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/auth/send-otp", {
        email: userData.email,
      });

      toast.success(translate("verificationCodeSent"));
      setStep(2);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || translate("somethingWentWrong");
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post("/auth/verify-otp", {
        email: userData.email,
        otp,
      });

      toast.success(translate("codeVerifiedSuccessfully"));
      setStep(3);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || translate("somethingWentWrong");
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      const errorMessage = translate("passwordsDoNotMatch");
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        email: userData.email,
        password,
        otp,
      });

      toast.success(translate("passwordResetSuccessfully"));
      setStep(1);
      setOtp("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || translate("somethingWentWrong");
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${isBigScreen ? "h-full w-full bg-white shadow-lg relative border border-gray-200 flex flex-col" : "p-4"}`}
    >
      <div
        className={`${!isBigScreen ? "h-fit w-full p-4 rounded-xl shadow-lg relative border border-gray-200 bg-white" : "flex-1 flex flex-col justify-center p-8 max-w-md mx-auto w-full"}`}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {translate("resetPassword")}
          </h2>
          {step === 1 && (
            <p className="text-gray-600 text-lg leading-relaxed">
              {translate("sendVerificationCodeDescription")}
            </p>
          )}
          {step === 2 && (
            <p className="text-gray-600 text-lg leading-relaxed">
              {translate("verificationCodeSentToEmail")}
            </p>
          )}
          {step === 3 && (
            <p className="text-gray-600 text-lg leading-relaxed">
              {translate("createNewPasswordDescription")}
            </p>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-6">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold ${
                step >= 1
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              1
            </div>
            <div
              className={`w-20 h-1 rounded-full ${step >= 2 ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gray-200"}`}
            ></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold ${
                step >= 2
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              2
            </div>
            <div
              className={`w-20 h-1 rounded-full ${step >= 3 ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gray-200"}`}
            ></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold ${
                step >= 3
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Step 1: Send OTP */}
        {step === 1 && (
          <div className="space-y-8">
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full py-4 px-8 rounded-lg bg-emerald-600 text-white font-semibold text-lg shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  {translate("sending")}
                </>
              ) : (
                translate("sendVerificationCode")
              )}
            </button>
          </div>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-8">
            <div className="flex flex-col gap-3 w-full items-start">
              <label
                htmlFor="otp"
                className="text-gray-700 text-base font-semibold"
              >
                {translate("enterVerificationCode")}
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder={translate("verificationCodePlaceholder")}
                className="py-4 px-5 bg-gray-50 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 text-lg"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-8 rounded-lg bg-emerald-600 text-white font-semibold text-lg shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  {translate("verifying")}
                </>
              ) : (
                translate("verifyCode")
              )}
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-8">
            <div className="space-y-6">
              <div className="flex flex-col gap-3 w-full items-start">
                <label
                  htmlFor="password"
                  className="text-gray-700 text-base font-semibold"
                >
                  {translate("newPassword")}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={translate("enterNewPassword")}
                  className="py-4 px-5 bg-gray-50 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 text-lg"
                />
              </div>
              <div className="flex flex-col gap-3 w-full items-start">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-700 text-base font-semibold"
                >
                  {translate("confirmNewPassword")}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder={translate("confirmPasswordPlaceholder")}
                  className="py-4 px-5 bg-gray-50 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 text-lg"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-8 rounded-lg bg-emerald-600 text-white font-semibold text-lg shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  {translate("resetting")}
                </>
              ) : (
                translate("resetPassword")
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
