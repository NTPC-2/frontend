import { useState } from "react";
import * as S from "./LoginStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoggedState } from "../../recoil/states/Login";
import { useRecoilState } from "recoil";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "http://43.201.247.254:8080",
  withCredentials: true, // 쿠키 전송을 위해 설정
});

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
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        // 리프레시 토큰이 존재하면 토큰 재발급 API 호출
        const response = await axiosInstance.post("/api/token/reissue", null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        if (accessToken && newRefreshToken) {
          // 새로운 액세스 토큰과 리프레시 토큰을 localStorage에 저장
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Axios 인스턴스에 새로운 accessToken 설정
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          // 로그인 상태를 true로 업데이트
          setIsLoggedIn({ isLoggedIn: true });

          // 저장한 토큰을 콘솔에 출력
          console.log("Access Token:", accessToken);
          console.log("Refresh Token:", newRefreshToken);

          navigate("/"); // 홈 페이지로 리디렉션
        } else {
          // 서버에서 리프레시 토큰이 유효하지 않다고 판단한 경우
          alert("토큰 재발급에 실패했습니다. 다시 로그인해 주세요.");
          localStorage.removeItem("refreshToken");
          setIsLoggedIn({ isLoggedIn: false });
          navigate("/Login");
        }
      } else {
        // 리프레시 토큰이 없으면 일반 로그인 API 호출
        const response = await axiosInstance.post(`/login`, {
          email: inputValue.email,
          password: inputValue.password,
        });

        if (response.status === 200) {
          const accessToken =
            response.headers["authorization"]?.split(" ")[1] ||
            response.headers["accessToken"];

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);

            const newRefreshToken = response.data.refreshToken;
            if (newRefreshToken) {
              localStorage.setItem("refreshToken", newRefreshToken);
            }

            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            setIsLoggedIn({ isLoggedIn: true });

            // 저장한 토큰을 콘솔에 출력
            console.log("Access Token:", accessToken);
            console.log("Refresh Token:", newRefreshToken);

            navigate("/");
          } else {
            alert("로그인에 실패했습니다. 다시 시도해 주세요.");
          }
        }
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
