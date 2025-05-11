"use client";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PhoneNumberInput from "@/components/Reusables/Inputs/PhoneNumberInput";
import { toast } from "react-toastify";

const Contact = () => {
  const translate = useTranslations("contactUs");
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = methods;

  const { data: session } = useSession();

  const formValues = useWatch({ control });

  useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phoneNumber || "",
      });
    }
  }, [session, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/reports", data);
      reset();
      toast.success(translate("successMessage"));
    } catch (error) {
      console.error(error);
      toast.error(translate("errorMessage"));
    }
  };

  useEffect(() => {
    console.log({ formValues });
  }, [formValues]);

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <h2 className="text-green-700 mb-6 text-center">
              {translate("contactUs")}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">
                    {translate("name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", {
                      required: translate("nameRequired"),
                    })}
                    className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">
                    {translate("email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: translate("emailRequired"),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: translate("emailInvalid"),
                      },
                    })}
                    className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1">
                    {translate("phone")}
                  </label>
                  <PhoneNumberInput name={"phone"} />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="inquiry" className="block text-gray-700 mb-1">
                    {translate("inquiry")}
                  </label>
                  <textarea
                    id="inquiry"
                    rows="4"
                    {...register("inquiry", {
                      required: translate("inquiryRequired"),
                    })}
                    className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black ${
                      errors.inquiry ? "border-red-500" : ""
                    }`}
                  ></textarea>
                  {errors.inquiry && (
                    <p className="text-red-500 text-sm">
                      {errors.inquiry.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 active:scale-95"
              >
                {translate("sendMessage")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Contact;
