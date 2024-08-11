import { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden; 
    overflow-y: auto;
    margin: 0; 
    padding: 0;
    box-sizing: border-box; 
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
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
  margin-top: 100px;
  justify-content: center;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyleInput = styled.input`
  width: 404px;
  height: 20px;
  margin-top: 10px;
  padding: 10px 0px 10px 10px;
  font-size: 14px;
  border-radius: 20px;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
`;

const SubmitButton = styled.div`
  margin-top: 40px;
  width: 404px;
  height: 35.4px;
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

  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 550;
  line-height: normal;
`;

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    nickname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <StyleTitle>회원가입</StyleTitle>
      <Container>
        <FormContainer>
          <StyleText>Nickname</StyleText>
          <StyleInput
            type="text"
            placeholder="Enter your Nickname"
            value={inputValue.nickname}
            onChange={(event) =>
              setInputValue({ ...inputValue, nickname: event.target.value })
            }
          />

          <StyleText>Phone Number</StyleText>
          <StyleInput
            type="tel"
            placeholder="Enter your Phone Number"
            value={inputValue.phone}
            onChange={(event) =>
              setInputValue({ ...inputValue, phone: event.target.value })
            }
          />

          <StyleText>Email</StyleText>
          <StyleInput
            type="email"
            placeholder="Enter your Email"
            value={inputValue.email}
            onChange={(event) =>
              setInputValue({ ...inputValue, email: event.target.value })
            }
          />

          <StyleText>Password</StyleText>
          <StyleInput
            type="password"
            placeholder="Enter your Password"
            value={inputValue.password}
            onChange={(event) =>
              setInputValue({ ...inputValue, password: event.target.value })
            }
          />

          <StyleText>Confirm Password</StyleText>
          <StyleInput
            type="password"
            placeholder="Confirm your Password"
            value={inputValue.confirmPassword}
            onChange={(event) =>
              setInputValue({
                ...inputValue,
                confirmPassword: event.target.value,
              })
            }
          />
          <SubmitButton>Signup</SubmitButton>
        </FormContainer>
      </Container>
    </>
  );
};

export default Signup;
