"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import GeneralInput from "@/components/Inputs/GeneralInput";
import GeneralButton from "@/components/Buttons/GeneralButton";

export default function ResetPassword() {
  const translate = useTranslations("ResetPassword");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const methods = useForm();

  const {
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = methods;

  const handleSendOTP = async (data) => {
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/auth/send-otp", { email: data.email });
      toast.success(translate("otpSent"));
      setStep(2);
    } catch (err) {
      console.error({ err });
      const errorMessage =
        err.response?.data?.error || translate("somethingWentWrong");
      setError(errorMessage);
      toast.error(`${translate("error")}: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (data) => {
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/auth/verify-otp", {
        email: watch("email"),
        otp: data.otp,
      });
      toast.success(translate("otpVerified"));
      setStep(3);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || translate("somethingWentWrong");
      setError(errorMessage);
      toast.error(`${translate("error")}: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data) => {
    if (data.password !== data.confirmPassword) {
      const errorMessage = translate("passwordsDoNotMatch");
      setError(errorMessage);
      toast.error(`${translate("error")}: ${errorMessage}`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("/api/auth/reset-password", {
        email: data?.email,
        password: data.password,
        otp: data?.otp,
      });
      toast.success(translate("passwordReset"));
      router.push("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || translate("somethingWentWrong");
      setError(errorMessage);
      toast.error(`${translate("error")}: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="h-full grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-light text-gray-900">
              {translate("resetYourPassword")}
            </h2>
          </div>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 space-y-6">
              <GeneralInput
                name="email"
                placeholder={translate("enterEmail")}
                validation={{
                  required: translate("emailRequired"),
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: translate("invalidEmailFormat"),
                  },
                }}
                error={errors.email}
              />
              <GeneralButton
                disabled={loading}
                isLoading={loading}
                onClick={() => handleSendOTP(getValues())}
              >
                {loading ? translate("sending") : translate("sendResetCode")}
              </GeneralButton>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 space-y-6">
              <GeneralInput
                name="otp"
                placeholder={translate("enterVerificationCode")}
                type="text"
                validation={{
                  required: translate("otpRequired"),
                }}
                error={errors.otp}
              />
              <GeneralButton
                disabled={loading}
                isLoading={loading}
                onClick={() => handleVerifyOTP(getValues())}
              >
                {loading ? translate("verifying") : translate("verifyCode")}
              </GeneralButton>
            </div>
          )}

          {step === 3 && (
            <div className="mt-8 space-y-6">
              <GeneralInput
                name="password"
                placeholder={translate("newPassword")}
                type="password"
                validation={{
                  required: translate("passwordRequired"),
                }}
                error={errors.password}
              />
              <GeneralInput
                name="confirmPassword"
                placeholder={translate("confirmNewPassword")}
                type="password"
                validation={{
                  required: translate("confirmPasswordRequired"),
                }}
                error={errors.confirmPassword}
              />
              <GeneralButton
                disabled={loading}
                isLoading={loading}
                onClick={() => handleResetPassword(getValues())}
              >
                {loading ? translate("resetting") : translate("resetPassword")}
              </GeneralButton>
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
