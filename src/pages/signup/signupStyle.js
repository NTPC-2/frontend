import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
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
  margin-top: 100px;
  justify-content: center;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyleInput = styled.input`
  width: 240px;
  height: 20px;
  margin-top: 10px;
  padding: 10px 0px 10px 10px;
  font-size: 14px;
  border-radius: 20px;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
`;

export const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-top: 10px;
`;

export const GenderLabel = styled.label`
  font-size: 14px;
  font-weight: 550;
`;

export const SubmitButton = styled.button`
  margin-top: 40px;
  width: 450px;
  height: 35.4px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#5b86e5")};
  border-radius: 10px;
  border: 1px solid #5b86e5;
  text-align: center;

  font-size: 20px;
  margin-left: 70px;
  color: white;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const StyleText = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 550;
  line-height: normal;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 10px;
`;

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 20px;
`;
