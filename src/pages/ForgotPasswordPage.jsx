import styled from "styled-components";
import { useState } from "react";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
`;

const SubmitButton = styled.button`
  margin-top: 40px;
  width: 90%;
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

const StyleInput = styled.input`
  width: 90%;
  height: 20px;
  margin-top: 10px;
  padding: 10px 0px 10px 10px;
  font-size: 14px;
  border-radius: 20px;
  margin-bottom: 5px;
  border: 1px solid #d9d9d9;
`;

const Container = styled.div`
  width: 590px;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#6482FF" : "#aaa")};
  border-bottom: ${(props) => (props.active ? "2px solid #6482FF" : "none")};
`;

const ForgotPasswordPage = () => {
  const [activeTab, setActiveTab] = useState("password");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (activeTab === "password") {
      window.alert("임시 비밀번호가 이메일로 전송되었습니다.");
    } else if (activeTab === "id") {
      window.alert("아이디 조회 요청이 접수되었습니다.");
    }
  };

  return (
    <Layout>
      <Container>
        <TabsContainer>
          <Tab active={activeTab === "id"} onClick={() => setActiveTab("id")}>
            아이디 찾기
          </Tab>
          <Tab
            active={activeTab === "password"}
            onClick={() => setActiveTab("password")}
          >
            비밀번호 찾기
          </Tab>
        </TabsContainer>

        {activeTab === "id" ? (
          <>
            <StyleInput
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <StyleInput
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </>
        ) : (
          <StyleInput
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <SubmitButton onClick={handleSubmit}>
          {activeTab === "id" ? "Find ID" : "Find Password"}
        </SubmitButton>
      </Container>
    </Layout>
  );
};

export default ForgotPasswordPage;
