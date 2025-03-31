import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import Image from "next/image";
import { LogoImage } from "@/imports/images";
import GoogleLoginButton from "@/components/Buttons/GoogleLoginButton";
import GeneralButton from "@/components/Buttons/GeneralButton";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { fetchUserAccountStatus } from "@/lib/queryFunctions";
import { toast } from "react-toastify";
import PasswordInput from "@/components/Inputs/PasswordInput";
import GeneralInput from "@/components/Inputs/GeneralInput";
import { CgArrowLeft } from "react-icons/cg";
import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";
import axios from "axios";

const AuthModal = ({ open, handleClose }) => {
  const [userExist, setUserExist] = useState(false);

  const [hasUserProceeded, setHasUserProceeded] = useState(false);

  const methods = useForm({ defaultValues: { userInputEmail: "" } });

  const { locale } = useParams();

  const {
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = methods;

  const userInputEmailValue = useWatch({ name: "userInputEmail", control });

  const enteredSigninPasswordValue = useWatch({
    name: "signinPassword",
    control,
  });

  const checkUserAccountStatus = async () => {
    toast.loading("Checking status");
    const doesUserExist = await fetchUserAccountStatus(userInputEmailValue);
    setHasUserProceeded(true);
    if (doesUserExist?.exists) {
      setUserExist(true);
      setValue("loginEmail", userInputEmailValue);
    } else {
      setUserExist(false);
      setValue("signinEmail", userInputEmailValue);
    }
    toast.dismiss();
  };

  const handleLogin = async (data) => {
    try {
      const result = await signIn("credentials", {
        identifier: data.loginEmail,
        password: data.loginPassword,
        redirect: false,
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Logged in successfully");
        handleClose();
      }
    } catch (error) {
      console.log({ error });
      toast.error("An error occurred during login");
    }
  };

  const handleSignup = async (data) => {
    toast.loading("Signing up...");

    try {
      await axios.post("/api/auth/signup", {
        name: data.signinName,
        email: data.signinEmail,
        phoneNumber: data.phoneNumber,
        password: data.signinPassword,
      });
      toast.dismiss();
      toast.success("Signup successful!");

      const result = await signIn("credentials", {
        identifier: data.signinEmail,
        password: data.signinPassword,
        redirect: false,
      });

      if (!result.error) {
        handleClose();
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <div>
        <FormProvider {...methods}>
          <div
            className="h-screen w-screen py-24 flex items-center justify-center"
            onClick={handleClose}
          >
            <div
              className="bg-white rounded-md overflow-hidden shadow h-full w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full w-full flex">
                <div className="h-full w-full max-w-80 pt-16 flex flex-col items-center gap-12 bg-green-100">
                  <div className="h-fit w-fit p-8 bg-green-600 rounded-full">
                    <Image
                      src={LogoImage}
                      className="h-24 w-24 object-contain"
                      height={192}
                      width={288}
                    />
                  </div>
                  <h3 className="    text-center">
                    Continue your Journey <br /> With Us
                  </h3>
                </div>
                {hasUserProceeded ? (
                  <div className="relative w-full">
                    <div className="absolute top-8 left-8">
                      <button
                        onClick={() => setHasUserProceeded(false)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                      >
                        <CgArrowLeft className="h-5 w-5" />
                        Back
                      </button>
                    </div>
                    {userExist ? (
                      <div className="h-full w-full grow flex items-center justify-center p-8 flex-col gap-4">
                        <h5>Login with your password to continue.</h5>
                        <GeneralInput
                          name="loginEmail"
                          placeholder="Enter email"
                          type="email"
                          disabled
                          validation={{
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Invalid email format",
                            },
                          }}
                          error={errors.loginEmail}
                        />
                        <PasswordInput
                          name="loginPassword"
                          error={errors?.loginPassword}
                        />

                        <GeneralButton
                          type="outlined"
                          onClick={handleSubmit(handleLogin)}
                        >
                          Proceed
                        </GeneralButton>
                      </div>
                    ) : (
                      <>
                        <div className="h-full w-full grow flex items-center justify-center p-8 flex-col gap-4">
                          <h5 className="   ">Create your account</h5>
                          <GeneralInput
                            name="signinEmail"
                            placeholder="Enter email"
                            type="email"
                            disabled
                            validation={{
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email format",
                              },
                            }}
                            error={errors.email}
                          />
                          <PasswordInput
                            name="signinPassword"
                            error={errors?.signinPassword}
                            placeholder="Enter your password"
                            validation={{
                              required: "Password is required",
                              pattern: {
                                value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,})/,
                                message:
                                  "Password must be at least 8 characters, contain one uppercase letter, and one special character",
                              },
                            }}
                          />{" "}
                          <PasswordInput
                            name="confirmSigninPassword"
                            error={errors?.confirmSigninPassword}
                            placeholder="Confirm your password"
                            validation={{
                              required: "Confirm Password is required",
                              validate: (value) =>
                                value === enteredSigninPasswordValue ||
                                "Passwords do not match",
                            }}
                          />
                          <GeneralInput
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            type="text"
                            validation={{
                              required: "Phone number is required",
                            }}
                            error={errors.phoneNumber}
                          />
                          <GeneralButton
                            type="outlined"
                            onClick={handleSubmit(handleSignup)}
                          >
                            Sign Up
                          </GeneralButton>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="h-full w-full grow flex items-center justify-center p-8 flex-col gap-6">
                    <GoogleLoginButton />
                    <div className="w-full flex gap-4 items-center">
                      <div className="h-[1.5px] w-full grow bg-gray-500"></div>
                      <h5 className="text-gray-500">Or</h5>
                      <div className="h-[1.5px] w-full grow bg-gray-500"></div>
                    </div>
                    <GeneralInput
                      name="userInputEmail"
                      placeholder="Enter email"
                      type="email"
                      validation={{
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Invalid email format",
                        },
                      }}
                      error={errors.email}
                    />
                    <GeneralButton
                      type="outlined"
                      onClick={() => {
                        checkUserAccountStatus();
                      }}
                    >
                      Continue with Email
                    </GeneralButton>
                    <p className="  text-gray-600 text-center">
                      By continuing, you agree to our{" "}
                      <a
                        href={`/${locale}/privacy-policy`}
                        className="text-green-600"
                      >
                        privacy policy
                      </a>{" "}
                      and{" "}
                      <a
                        href={`/${locale}/terms-and-conditions`}
                        className="text-green-600"
                      >
                        terms & conditions
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </ModalWrapper>
  );
};

export default AuthModal;
