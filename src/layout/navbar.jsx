import { useState, useEffect } from "react";

import styled from "styled-components";
import { useRecoilState } from "recoil";
import { LoggedState } from "../recoil/states/Login";
import { Link, useNavigate } from "react-router-dom";
import myPageIcon from "../assets/Avatar.png";
import login from "../assets/Login.png";
import logout from "../assets/logout.png";
import signup from "../assets/signup.png";

import axios from "axios";
import { setCookie, getCookie } from "../utils/UseCookies";

// Axios 인스턴스 생성 및 기본 설정
const axiosInstance = axios.create({
  baseURL: "http://43.201.247.254:8080",
  withCredentials: true,
});

const Container = styled.div`
  width: 100%;
  height: 6%;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  top: 0;
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
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoggedState);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 쿠키에서 refresh 토큰 가져오기
    const refreshToken = getCookie("refresh");

    if (refreshToken) {
      // 토큰이 존재하면 로그인 상태로 설정
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${refreshToken}`;
      setIsLoggedIn({ isLoggedIn: true });
    }
  }, [setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      // 서버의 로그아웃 엔드포인트로 POST 요청을 보내 쿠키를 삭제하도록 요청
      await axiosInstance.post(`/logout`);

      // 쿠키에서 accessToken과 refresh 삭제
      setCookie("accessToken", "", {
        path: "/",
        expires: new Date(0), // 즉시 만료
      });
      setCookie("refresh", "", {
        path: "/",
        expires: new Date(0), // 즉시 만료
      });

      // Axios 인스턴스에서 Authorization 헤더 제거
      delete axiosInstance.defaults.headers.common["Authorization"];

      // 상태 업데이트 및 리디렉션
      setIsLoggedIn({ isLoggedIn: false, user: null });
      navigate("/");
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
      alert("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/categories/search?query=${searchQuery}`);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <HomeLogo to="/">인슐랭</HomeLogo>
      </ContentContainer>
      <ContentContainer>
        <StyleLink to="/Community">게시판</StyleLink>
      </ContentContainer>
      <SearchBarContainer>
        <SearchInput
          placeholder="Search ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </SearchBarContainer>
      <ContentContainer>
        {isLoggedIn.isLoggedIn ? ( // 로그인 여부에 따라 조건 변경
          <>
            <MyPageLink to="/" onClick={handleLogout}>
              <LoginIcon src={logout} alt="Logout" />
            </MyPageLink>
            <MyPageLink to={`/mypage`}>
              <MyPageIcon src={myPageIcon} alt="My Page" />
            </MyPageLink>
          </>
        ) : (
          <>
            <MyPageLink to="/Signup">
              <LoginIcon src={signup} alt="Signup" />
            </MyPageLink>
            <MyPageLink to="/Login">
              <LoginIcon src={login} alt="Login" />
            </MyPageLink>
          </>
        )}
      </ContentContainer>
    </Container>
  );
};

export default Navbar;
