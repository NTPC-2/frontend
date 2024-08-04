import { useState } from "react";
import styled from "styled-components";

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

const LoginPage = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

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
            value={inputValue.password}
            onChange={(event) =>
              setInputValue({ ...inputValue, password: event.target.value })
            }
          />
          <SubmitButton>Login</SubmitButton>
        </FormContainer>
      </Container>
    </>
  );
};

export default LoginPage;
