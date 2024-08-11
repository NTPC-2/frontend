import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

const StyleTitle = styled.div`
  color: #000;
  position: absolute;
  margin-top: 110px;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.2px;
  left: 230px;
`;
const FormContainer = styled.div`
  justify-content: center;
  height: 100vh;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleInput = styled.input`
  width: 50%;
  height: 20px;
  margin-top: 10px;
  padding: 10px 0px 10px 10px;
  font-size: 14px;
  border-radius: 20px;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
`;

const SubmitButton = styled.button`
  margin-top: 40px;
  width: 50%;
  height: 50px;
  background-color: #5b86e5;
  border-radius: 10px;
  border: 1px solid #5b86e5;
  text-align: center;
  font-size: 20px;
  margin-left: 5px;
  color: white;

  cursor: pointer;
`;

const StyleText = styled.div`
  color: #000;
  display: flex;

  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 550;
  line-height: normal;
  align-items: flex-start;
  width: 50%;
`;

const ForgotPassward = styled.div`
  color: rgba(75, 68, 68, 0.7);
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleForgotPasswordClick = () => {
    navigate("/Login/forgot-password");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(inputValue.email)) {
      alert("Invalid email format.");
      return;
    }

    if (inputValue.password.length > 12) {
      alert("Password must be less than or equal to 12 characters.");
      return;
    }

    // Assume login is successful
    navigate("/");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(inputValue.email)) {
        alert("Invalid email format.");
        return;
      }

      if (inputValue.password.length > 12) {
        alert("Password must be less than or equal to 12 characters.");
        return;
      }

      // Assume login is successful
      navigate("/");
    }
  };

  return (
    <>
      <StyleTitle>로그인</StyleTitle>
      <Container>
        <FormContainer>
          <StyleText>Email address</StyleText>
          <StyleInput
            type="email"
            placeholder="Enter your email"
            value={inputValue.email}
            onChange={(event) =>
              setInputValue({ ...inputValue, email: event.target.value })
            }
          />
          <StyleText>Password</StyleText>
          <StyleInput
            type="password"
            placeholder="Enter your password"
            onKeydown={handleKeyDown}
            value={inputValue.password}
            onChange={(event) =>
              setInputValue({ ...inputValue, password: event.target.value })
            }
          />
          <ForgotPassward onClick={handleForgotPasswordClick}>
            Forgot your password?
          </ForgotPassward>
          <SubmitButton onClick={handleSubmit}>Login</SubmitButton>
        </FormContainer>
      </Container>
    </>
  );
};

export default LoginPage;
