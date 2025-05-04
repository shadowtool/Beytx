const EmailTemplate = ({ otp }) => {
  return (
    <div className="font-sans max-w-lg mx-auto p-5 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-gray-800 text-2xl font-bold mb-5">
          Password Reset Code
        </h1>
        <p className="text-gray-600 leading-relaxed">
          You have requested to reset your password. Please use the following
          verification code:
        </p>
        <div className="bg-gray-200 py-4 px-6 my-5 rounded text-center text-xl font-bold tracking-widest"></div>
        <div className="text-gray-800 text-3xl font-bold mb-5 text-center">
          {otp}
        </div>
        <p className="text-gray-600 leading-relaxed">
          This code will expire in 10 minutes. If you did not request this
          reset, please ignore this email.
        </p>
      </div>
    </div>
  );
};

export default EmailTemplate;
