import otpGenerator from "otp-generator";

const generateOtp = () => {
  return otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });
};

export { generateOtp };
