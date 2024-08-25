import { useState } from "react";
import * as S from "./LoginStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoggedState } from "../../recoil/states/Login";
import { useRecoilState } from "recoil";
import { setCookie } from "../../utils/UseCookies";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoggedState);

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleForgotPasswordClick = () => {
    navigate("/Login/forgot-password");
  };

  const validateInputs = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(inputValue.email)) {
      newErrors.email = "아이디를 이메일 형식으로 입력해주세요.";
      valid = false;
    }

    if (inputValue.password.length < 4 || inputValue.password.length > 12) {
      newErrors.password = "비밀번호를 4~12자 이내로 작성해주세요.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/login`, {
        email: inputValue.email,
        password: inputValue.password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Save token in cookie
        setCookie("authToken", token, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });

        setIsLoggedIn({ isLoggedIn: true, user });
        alert("Login successful");
        navigate("/");
      }
      if (response.status === 200) {
        const { token, user } = response.data;

        // Save token in cookie
        setCookie("authToken", token, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });

        setIsLoggedIn({ isLoggedIn: true, user });
        alert("Login successful");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <>
      <S.StyleTitle>로그인</S.StyleTitle>
      <S.Container>
        <S.FormContainer>
          <S.StyleText>Email address</S.StyleText>
          <S.StyleInput
            type="email"
            name="email"
            placeholder="Enter your email"
            value={inputValue.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Listen for Enter key
          />
          {errors.email && <S.ErrorMessage>{errors.email}</S.ErrorMessage>}

          <S.StyleText>Password</S.StyleText>
          <S.StyleInput
            type="password"
            name="password"
            placeholder="Enter your password"
            value={inputValue.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Listen for Enter key
          />
          {errors.password && (
            <S.ErrorMessage>{errors.password}</S.ErrorMessage>
          )}

          <S.ForgotPassward onClick={handleForgotPasswordClick}>
            Forgot your password?
          </S.ForgotPassward>
          <S.SubmitButton onClick={handleSubmit}>Login</S.SubmitButton>
        </S.FormContainer>
      </S.Container>
    </>
  );
};

export default LoginPage;
