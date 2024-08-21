import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

export const StyleTitle = styled.div`
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

export const FormContainer = styled.div`
  justify-content: center;
  height: 100vh;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyleInput = styled.input`
  width: 50%;
  height: 20px;
  margin-top: 10px;
  padding: 10px 0px 10px 10px;
  font-size: 14px;
  border-radius: 20px;
  margin-bottom: 5px; // 줄바꿈을 위한 여유 추가
  border: 1px solid #d9d9d9;
`;

export const SubmitButton = styled.button`
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

export const StyleText = styled.div`
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

export const ForgotPassward = styled.div`
  color: rgba(75, 68, 68, 0.7);
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: #ff4646;
  font-size: 12px;
  width: 50%;
  text-align: left;
  margin-bottom: 20px;
`;
