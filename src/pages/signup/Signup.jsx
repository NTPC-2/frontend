import { useState, useCallback } from "react";
import { createGlobalStyle } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as S from "./signupStyle";
import debounce from "lodash.debounce";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden; 
    overflow-y: auto;
    margin: 0; 
    padding: 0;
    box-sizing: border-box; 
  }
`;

const Signup = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    nickname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    profileImg: null,
  });

  const [errors, setErrors] = useState({
    nickname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
  });

  const [errorMessage, setErrorMessage] = useState({});
  const [emailValid, setEmailValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);

  const validateNicknameFormat = (nickname) => {
    return nickname.length >= 2 && nickname.length <= 6;
  };

  const handleNicknameValidation = async (nickname) => {
    if (!validateNicknameFormat(nickname)) {
      setErrors({
        ...errors,
        nickname: "닉네임은 2자에서 6자 사이여야 합니다.",
      });
      setNicknameValid(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/test/nickname/${nickname}`
      );

      if (response.status === 200) {
        const { code, message } = response.data;

        if (code === 200) {
          setErrors({
            ...errors,
            nickname: "사용 가능한 닉네임입니다!",
          });
          setNicknameValid(true);
        } else if (code === 3011) {
          setErrors({
            ...errors,
            nickname: "이미 존재하는 닉네임입니다.",
          });
          setNicknameValid(false);
        } else {
          setErrors({
            ...errors,
            nickname: message || "닉네임 확인 중 오류가 발생했습니다.",
          });
          setNicknameValid(false);
        }
      }
    } catch (error) {
      setErrors({
        ...errors,
        nickname: "닉네임 확인 중 오류가 발생했습니다.",
      });
      setNicknameValid(false);
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,11}$/;
    return phoneRegex.test(phone);
  };

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailValidation = async (email) => {
    if (!validateEmailFormat(email)) {
      setErrors({
        ...errors,
        email: "이메일 형식을 올바르게 입력해주세요.",
      });
      setEmailValid(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/test/email/${email}`
      );

      if (response.status === 200) {
        const { code, message } = response.data;

        if (code === 200) {
          setErrors({
            ...errors,
            email: "가입 가능한 이메일입니다!",
          });
          setEmailValid(true);
        } else if (code === 3010) {
          setErrors({
            ...errors,
            email: "이미 존재하는 이메일입니다.",
          });
          setEmailValid(false);
        } else {
          setErrors({
            ...errors,
            email: message || "이메일 확인 중 오류가 발생했습니다.",
          });
          setEmailValid(false);
        }
      }
    } catch (error) {
      setErrors({
        ...errors,
        email: "이메일 확인 중 오류가 발생했습니다.",
      });
      setEmailValid(false);
    }
  };

  const validatePassword = (password) => {
    return password.length >= 4 && password.length <= 12;
  };

  const validateAge = (age) => {
    return age >= 0 && age <= 120;
  };

  const debouncedNicknameValidation = useCallback(
    debounce(handleNicknameValidation, 500),
    []
  );
  const debouncedEmailValidation = useCallback(
    debounce(handleEmailValidation, 500),
    []
  );

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setInputValue({
      ...inputValue,
      [name]: files ? files[0] : value,
    });

    if (name === "email") {
      debouncedEmailValidation(value);
      return;
    }

    if (name === "nickname") {
      debouncedNicknameValidation(value);
      return;
    }

    let error = "";

    switch (name) {
      case "phone":
        if (!validatePhone(value)) {
          error = "전화번호는 10~11자리 숫자여야 합니다.";
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          error = "비밀번호는 4자에서 12자 사이여야 합니다.";
        }
        break;
      case "confirmPassword":
        if (value !== inputValue.password) {
          error = "비밀번호가 일치하지 않습니다.";
        }
        break;
      case "age":
        if (!validateAge(value)) {
          error = "나이는 0에서 120 사이의 숫자여야 합니다.";
        }
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const isFormValid = () => {
    return (
      nicknameValid &&
      validatePhone(inputValue.phone) &&
      emailValid &&
      validatePassword(inputValue.password) &&
      inputValue.password === inputValue.confirmPassword &&
      inputValue.gender &&
      validateAge(inputValue.age)
    );
  };

  const handleSignup = async () => {
    const formData = new FormData();
    formData.append("email", inputValue.email);
    formData.append("password", inputValue.password);
    formData.append("nickname", inputValue.nickname);
    formData.append("phoneNumber", inputValue.phone);
    formData.append("gender", inputValue.gender);
    formData.append("age", inputValue.age);
    formData.append("profileImg", inputValue.profileImg);

    if (inputValue.profileImg) {
      formData.append("profileImg", inputValue.profileImg);
    } else {
      const defaultImageUrl = "http://localhost:3000/%EA%B8%B0%EB%B3%B8.jpeg";
      formData.append("profileImg", defaultImageUrl);
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("회원가입 성공! 로그인해주세요!");
        navigate("/"); // Navigate to login page
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        if (status === 3010) {
          setErrorMessage({
            ...errorMessage,
            email: "이미 존재하는 이메일입니다.",
          });
          setInputValue({ ...inputValue, email: "" });
        } else if (status === 3011) {
          setErrorMessage({
            ...errorMessage,
            nickname: "이미 존재하는 닉네임입니다.",
          });
          setInputValue({ ...inputValue, nickname: "" });
        } else {
          console.log("오류 발생:", error.response.data);
        }
      } else {
        console.log("네트워크 오류 또는 서버 오류:", error);
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <S.StyleTitle>회원가입</S.StyleTitle>
      <S.Container>
        <S.FormContainer>
          <S.InputRow>
            <div>
              <S.StyleText>닉네임</S.StyleText>
              <S.StyleInput
                type="text"
                placeholder="닉네임 입력"
                name="nickname"
                value={inputValue.nickname}
                onChange={handleInputChange}
              />
              {errors.nickname && <S.ErrorText>{errors.nickname}</S.ErrorText>}
            </div>

            <div>
              <S.StyleText>전화번호</S.StyleText>
              <S.StyleInput
                type="tel"
                placeholder="전화번호 입력"
                name="phone"
                value={inputValue.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <S.ErrorText>{errors.phone}</S.ErrorText>}
            </div>
          </S.InputRow>

          <S.InputRow>
            <div>
              <S.StyleText>이메일</S.StyleText>
              <S.StyleInput
                type="email"
                placeholder="이메일 입력"
                name="email"
                value={inputValue.email}
                onChange={handleInputChange}
              />
              {errors.email && <S.ErrorText>{errors.email}</S.ErrorText>}
            </div>

            <div>
              <S.StyleText>비밀번호</S.StyleText>
              <S.StyleInput
                type="password"
                placeholder="비밀번호 입력"
                name="password"
                value={inputValue.password}
                onChange={handleInputChange}
              />
              {errors.password && <S.ErrorText>{errors.password}</S.ErrorText>}
            </div>
          </S.InputRow>

          <S.InputRow>
            <div>
              <S.StyleText>비밀번호 확인</S.StyleText>
              <S.StyleInput
                type="password"
                placeholder="비밀번호 확인"
                name="confirmPassword"
                value={inputValue.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <S.ErrorText>{errors.confirmPassword}</S.ErrorText>
              )}
            </div>

            <div>
              <S.StyleText>나이</S.StyleText>
              <S.StyleInput
                type="number"
                placeholder="나이 입력"
                name="age"
                value={inputValue.age}
                onChange={handleInputChange}
              />
              {errors.age && <S.ErrorText>{errors.age}</S.ErrorText>}
            </div>
          </S.InputRow>

          <S.StyleText>성별</S.StyleText>
          <S.GenderContainer>
            <S.GenderLabel>
              <input
                type="radio"
                name="gender"
                value="M"
                checked={inputValue.gender === "M"}
                onChange={handleInputChange}
              />
              남성
            </S.GenderLabel>
            <S.GenderLabel>
              <input
                type="radio"
                name="gender"
                value="W"
                checked={inputValue.gender === "W"}
                onChange={handleInputChange}
              />
              여성
            </S.GenderLabel>
          </S.GenderContainer>
          {errors.gender && <S.ErrorText>{errors.gender}</S.ErrorText>}

          <S.StyleText>프로필 이미지(선택)</S.StyleText>
          <S.StyleInput
            type="file"
            name="profileImg"
            accept="image/*"
            onChange={handleInputChange}
          />

          <S.SubmitButton onClick={handleSignup} disabled={!isFormValid()}>
            회원가입
          </S.SubmitButton>
        </S.FormContainer>
      </S.Container>
    </>
  );
};

export default Signup;
