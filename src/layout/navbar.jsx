import styled from "styled-components";
import { Link } from "react-router-dom";
import myPageIcon from "../assets/Avatar.png";
import login from "../assets/Login.png";
const Container = styled.div`
  width: 100%;
  height: 6%;
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
  border-radius: 20px;
  border: 1px solid #ccc;
`;

const MyPageLink = styled(Link)`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const MyPageIcon = styled.img`
  width: 24px;
  height: 24px;

  &:hover {
    transform: scale(1.2);
  }
`;

const LoginIcon = styled.img`
  width: 60px;
  height: 24px;

  &:hover {
    transform: scale(1.2);
  }
`;

const Navbar = () => {
  return (
    <Container>
      <ContentContainer>
        <HomeLogo to="/">인슐랭</HomeLogo>
      </ContentContainer>
      <ContentContainer>
        <StyleLink to="/Community">게시판</StyleLink>
      </ContentContainer>
      <SearchBarContainer>
        <SearchInput placeholder="Seearch ..."></SearchInput>
      </SearchBarContainer>
      <ContentContainer>
        <MyPageLink to="/Login">
          <LoginIcon src={login} alt="Login" />
        </MyPageLink>

        <MyPageLink to="/mypage">
          <MyPageIcon src={myPageIcon} alt="My Page" />
        </MyPageLink>
      </ContentContainer>
    </Container>
  );
};

export default Navbar;
