"use client";
import FormWrapper from "@/components/AuthComponents/FormWrapper";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LongArrowIcon } from "@/imports/icons";
import { useParams, useRouter } from "next/navigation";

export default function Signup() {
  const { locale } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    toast.info("Signing up...");

    try {
      await axios.post("/api/auth/signup", data);
      setLoading(false);
      toast.success("Signup successful!");
      reset();
      router.push(`/${locale}/auth/login `);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <FormWrapper>
      {!showForm ? (
        <div className="flex flex-col gap-4 w-full p-6 text-center">
          <p className="text-lg font-medium">Choose a method to sign up</p>
          <p className="text-sm text-gray-600 mb-8">
            You can continue with your email or use Google for quick access.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="h-12 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <img src="/images/email.png" alt="Google" className="w-8 h-8" />
            Continue with Email
          </button>
          <div className="flex w-full gap-4 my-4 items-center">
            <div className="w-full grow h-[2px] bg-gray-300 rounded-full"></div>
            <h5 className="text-gray-600 text-sm">Or</h5>
            <div className="w-full grow h-[2px] bg-gray-300 rounded-full"></div>
          </div>
          <button
            onClick={() => signIn("google")}
            className="h-12 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <img
              src="/images/googlelogo.png"
              alt="Google"
              className="w-8 h-8"
            />
            Continue with Google
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full p-6"
        >
          {/* Back Button */}
          <button
            onClick={() => setShowForm(false)}
            type="button"
            className="min-h-8 min-w-8 max-h-8 max-w-8 border border-solid border-green-600 flex items-center justify-center"
          >
            <LongArrowIcon size={14} className="text-green-600" />
          </button>

          {/* Name Field */}
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-z]{6,}$/,
                  message: "At least 6 lowercase letters",
                },
              })}
              className="h-12 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="h-12 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Must be a 10-digit phone number",
                },
              })}
              className="h-12 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char",
                },
              })}
              className="h-12 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="h-12 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>
      )}
    </FormWrapper>
  );
}
