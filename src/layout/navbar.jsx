import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 8%;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: fixed;
  z-index: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HomeLogo = styled(Link)`
  text-decoration: none;
  padding: 15px;
  color: #457aae;
  font-weight: 600;
  font-size: 20px;

  &:hover {
    color: black;
    transform: scale(1.1);
  }
`;

const LoginLogout = styled(Link)`
  padding: 15px;
  color: #000000;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  padding: 15px;
  color: ${(props) => (props.$active ? "#457aae" : "black")};
  font-weight: ${(props) => (props.$active ? "700" : "500")};

  &:hover {
    transform: scale(1.2);
    color: #457aae;
  }
`;

const SearchBarContainer = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  margin: 20px auto;
`;

const SearchInput = styled.input`
  width: 90%;
  padding: 10px;
  border-radius: 10px;
`;

const Navbar = () => {
  return (
    <Container>
      <ContentContainer>
        <HomeLogo to="/">인슐랭</HomeLogo>
      </ContentContainer>
      <ContentContainer>
        <styledLink to="/1">게시판</styledLink>
      </ContentContainer>
      <SearchBarContainer>
        <SearchInput placeholder="Seearch ..."></SearchInput>
      </SearchBarContainer>
      <ContentContainer>
        <LoginLogout to="/signup">회원가입</LoginLogout>
        <StyleLink to="/mypage">마이페이지</StyleLink>
      </ContentContainer>
    </Container>
  );
};

export default Navbar;
