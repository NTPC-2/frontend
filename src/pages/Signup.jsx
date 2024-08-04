import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const StyleTitle = styled.div`
  align-self: flex-start;
  color: #000;
  margin-top: 100px;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.2px;

  padding: 10px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 130px;
  width: 100%;
  height: calc(100vh - 150px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5b86e5;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 404px;
  margin-bottom: 20px;
`;

const StyleInput = styled.input`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 20px;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
`;

const SubmitButton = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 404px;
  height: 40px;
  background-color: #5b86e5;
  border-radius: 10px;
  border: 1px solid #5b86e5;
  text-align: center;
  font-size: 20px;
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
    <Container>
      <StyleTitle>회원가입</StyleTitle>

      <FormContainer>
        <FormGroup>
          <StyleText>닉네임</StyleText>
          <StyleInput
            type="text"
            placeholder="Enter your nickname"
            value={inputValue.nickname}
            onChange={(event) =>
              setInputValue({ ...inputValue, nickname: event.target.value })
            }
          />
        </FormGroup>

        <FormGroup>
          <StyleText>전화번호</StyleText>
          <StyleInput
            type="tel"
            placeholder="Enter your phone number"
            value={inputValue.phone}
            onChange={(event) =>
              setInputValue({ ...inputValue, phone: event.target.value })
            }
          />
        </FormGroup>

        <FormGroup>
          <StyleText>이메일</StyleText>
          <StyleInput
            type="email"
            placeholder="Enter your email"
            value={inputValue.email}
            onChange={(event) =>
              setInputValue({ ...inputValue, email: event.target.value })
            }
          />
        </FormGroup>

        <FormGroup>
          <StyleText>비밀번호</StyleText>
          <StyleInput
            type="password"
            placeholder="Enter your password"
            value={inputValue.password}
            onChange={(event) =>
              setInputValue({ ...inputValue, password: event.target.value })
            }
          />
        </FormGroup>

        <FormGroup>
          <StyleText>비밀번호 확인</StyleText>
          <StyleInput
            type="password"
            placeholder="Confirm your password"
            value={inputValue.confirmPassword}
            onChange={(event) =>
              setInputValue({
                ...inputValue,
                confirmPassword: event.target.value,
              })
            }
          />
        </FormGroup>

        <SubmitButton>Signup</SubmitButton>
      </FormContainer>
    </Container>
  );
};

export default Signup;
