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
import { useTranslations } from "next-intl";
import PhoneNumberInput from "@/components/Inputs/PhoneNumberInput";
import { useRouter } from "next/navigation";
``;
const AuthModal = ({ open, handleClose }) => {
  const [userExist, setUserExist] = useState(false);
  const [hasUserProceeded, setHasUserProceeded] = useState(false);
  const methods = useForm({ defaultValues: { userInputEmail: "" } });
  const { locale } = useParams();
  const router = useRouter();
  const translate = useTranslations("authModal");

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
    toast.loading(translate("checkingStatus"));
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
        toast.success(translate("loginSuccess"));
        handleClose();
      }
    } catch (error) {
      toast.error(translate("loginError"));
    }
  };

  const handleSignup = async (data) => {
    toast.loading(translate("signingUp"));

    try {
      await axios.post("/api/auth/signup", {
        name: data.signinName,
        email: data.signinEmail,
        phoneNumber: data.phoneNumber,
        password: data.signinPassword,
      });
      toast.dismiss();
      toast.success(translate("signupSuccess"));

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
      toast.error(error.response?.data?.message || translate("signupFailed"));
    }
  };

  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      <div>
        <FormProvider {...methods}>
          <div
            className="h-screen w-screen py-16 flex items-center justify-center"
            onClick={handleClose}
          >
            <div
              className="bg-white rounded-md overflow-hidden shadow h-full w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full w-full flex flex-col">
                <div className="h-fit p-4 w-full flex items-center gap-4 bg-green-100">
                  <div className="min-h-16 min-w-16 max-h-16 max-w-16 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Image
                      src={LogoImage}
                      className="h-14 w-14 object-cover rounded-full"
                      height={192}
                      width={288}
                    />
                  </div>
                  <h6 className="text-center">
                    {translate("continueJourney")}
                  </h6>
                </div>
                {hasUserProceeded ? (
                  <div className="relative w-full h-fit">
                    <div className="absolute top-8 left-8">
                      <button
                        onClick={() => setHasUserProceeded(false)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                      >
                        <CgArrowLeft className="h-5 w-5" />
                        {translate("back")}
                      </button>
                    </div>
                    {userExist ? (
                      <div className="h-fit w-full flex items-center justify-center p-8 flex-col gap-4 mt-12">
                        <h5>{translate("loginWithPassword")}</h5>
                        <GeneralInput
                          name="loginEmail"
                          placeholder={translate("enterEmail")}
                          type="email"
                          disabled
                          validation={{
                            required: translate("emailRequired"),
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: translate("invalidEmailFormat"),
                            },
                          }}
                          error={errors.loginEmail}
                        />
                        <PasswordInput
                          name="loginPassword"
                          error={errors?.loginPassword}
                          placeholder={translate("enterYourPassword")}
                        />
                        <button
                          onClick={() => {
                            handleClose();
                            router.push(`/${locale}/forgot-password`);
                          }}
                          className="text-sm text-green-600 hover:underline"
                        >
                          {translate("forgotPassword")}
                        </button>
                        <GeneralButton
                          type="outlined"
                          onClick={handleSubmit(handleLogin)}
                        >
                          {translate("proceed")}
                        </GeneralButton>
                      </div>
                    ) : (
                      <>
                        <div className="h-fit w-full flex items-center justify-center p-8 flex-col gap-4 mt-12">
                          <h5>{translate("createAccount")}</h5>
                          <GeneralInput
                            name="signinEmail"
                            placeholder={translate("enterEmail")}
                            type="email"
                            disabled
                            validation={{
                              required: translate("emailRequired"),
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: translate("invalidEmailFormat"),
                              },
                            }}
                            error={errors.email}
                          />
                          <PasswordInput
                            name="signinPassword"
                            error={errors?.signinPassword}
                            placeholder={translate("enterYourPassword")}
                            validation={{
                              required: translate("passwordRequired"),
                              pattern: {
                                value: /.{6,}/,
                                message: translate("passwordCriteria"),
                              },
                            }}
                          />
                          <PasswordInput
                            name="confirmSigninPassword"
                            error={errors?.confirmSigninPassword}
                            placeholder={translate("confirmYourPassword")}
                            validation={{
                              required: translate("confirmPasswordRequired"),
                              validate: (value) =>
                                value === enteredSigninPasswordValue ||
                                translate("passwordsDoNotMatch"),
                            }}
                          />
                          <PhoneNumberInput
                            name="phoneNumber"
                            validation={{
                              required: translate("phoneNumberRequired"),
                            }}
                            error={errors.phoneNumber}
                          />
                          <GeneralButton
                            type="outlined"
                            onClick={handleSubmit(handleSignup)}
                          >
                            {translate("signUp")}
                          </GeneralButton>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="h-fit w-full flex items-center justify-center p-8 flex-col gap-6">
                    <GoogleLoginButton />
                    <div className="w-full flex gap-4 items-center">
                      <div className="h-[1.5px] w-full grow bg-gray-500"></div>
                      <h5 className="text-gray-500">{translate("or")}</h5>
                      <div className="h-[1.5px] w-full grow bg-gray-500"></div>
                    </div>
                    <GeneralInput
                      name="userInputEmail"
                      placeholder={translate("enterEmail")}
                      type="email"
                      validation={{
                        required: translate("emailRequired"),
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: translate("invalidEmailFormat"),
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
                      {translate("continueWithEmail")}
                    </GeneralButton>
                    <p className="text-gray-600 text-center">
                      {translate("agreeToPolicies")}{" "}
                      <a
                        href={`/${locale}/privacy-policy`}
                        className="text-green-600"
                      >
                        {translate("privacyPolicy")}
                      </a>{" "}
                      {translate("and")}{" "}
                      <a
                        href={`/${locale}/terms-and-conditions`}
                        className="text-green-600"
                      >
                        {translate("termsAndConditions")}
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
