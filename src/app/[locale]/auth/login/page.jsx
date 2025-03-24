"use client";
import FormWrapper from "@/components/AuthComponents/FormWrapper";
import { LongArrowIcon } from "@/imports/icons";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const [showForm, setShowForm] = useState(false);

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setFormError("root", { message: result.error });
    } else {
      window.location.href = "/";
    }
  };

  return (
    <FormWrapper>
      {!showForm ? (
        <div className="flex flex-col gap-4 w-full p-6 text-center">
          <p className="text-lg font-medium">Welcome Back</p>
          <p className="text-sm text-gray-600 mb-6">
            Log in with email or Google
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
          className="flex flex-col gap-4 w-full p-4"
        >
          {/* Back Button */}
          <button
            onClick={() => setShowForm(false)}
            type="button"
            className="min-h-8 min-w-8 max-h-8 max-w-8 border border-solid border-green-600 flex items-center justify-center"
          >
            <LongArrowIcon size={14} className="text-green-600" />
          </button>

          <input
            type="text"
            placeholder="Email or Phone Number"
            className="h-12 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("identifier", { required: "This field is required" })}
          />
          {errors.identifier && (
            <p className="text-red-500 text-sm">{errors.identifier.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="h-12 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("password", { required: "This field is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="h-12 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 mt-2"
          >
            Login
          </button>
          {errors.root && (
            <p className="text-red-500 text-sm text-center">
              {errors.root.message}
            </p>
          )}
        </form>
      )}
    </FormWrapper>
  );
}
