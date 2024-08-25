import styled from "styled-components";
import mypage from "../../assets/mypage.png";

import { createGlobalStyle } from "styled-components";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../recoil/states/Mypage";
import { useState } from "react";
import MyPostspage from "./MyPostespage";
import Reviewpage from "./Reviewpage";
import MycCommentspage from "./MyCommentspage";
import Bookmarkpage from "./Bookmarkpage";
import Likepage from "./Likepage";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* X축 스크롤 제거 */
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HorizontalLine = styled.div`
  width: 100%;
  margin-top: 8%;
  height: 1px;
  background-color: black;
`;

const HorizontalLine2 = styled.div`
  width: 700px;
  margin-top: 10px;
  height: 2px;
  background-color: black;
`;

const ProfileContainer = styled.div`
  width: 700px;
  height: 170px;
  margin-top: 50px; /* Navbar의 높이만큼 margin-top 추가 */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ccc;
  border-radius: 50%;
  margin-left: 20px;
`;

const NameBox = styled.div`
  width: 348px;
  height: 58px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const MyBox = styled.div`
  justify-content: center;
  height: 150px;
  width: 120px;
  display: flex;
  flex-direction: column;
  margin-left: 60px;
`;

const Icon = styled.img`
  width: 58px;
  height: 48px;
  margin-left: 15px;

  &:hover {
    transform: scale(1.1);
  }
`;

const ListContainer = styled.div`
  width: 700px;
  height: 170px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ContentBox = styled.div`
  width: 110px;
  height: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

const StyledText = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;

const FoodContainer = styled.div`
  height: 500px;
  width: 700px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: center;
  padding: 20px;
`;

const StyledText2 = styled.div``;

const Mypage = () => {
  const userData = useRecoilValue(userState);
  const [selectedTab, setSelectedTab] = useState("즐겨찾기");
  const navigate = useNavigate();
  const renderContent = () => {
    switch (selectedTab) {
      case "즐겨찾기":
        return <Bookmarkpage count={userData.countMyBookmark} />;
      case "리뷰":
        return <Reviewpage count={userData.countMyReview} />;
      case "좋아요":
        return <Likepage count={userData.countMyHeart} />;
      case "작성한 글":
        return <MyPostspage count={userData.countMyPost} />;
      case "댓글":
        return <MycCommentspage count={userData.countMyScrap} />;
      default:
        return null;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Layout>
        <HorizontalLine />
        <ProfileContainer>
          <ProfileImage></ProfileImage>
          <NameBox>
            <Name>{userData.userNickname}</Name>
            <StyledText2>안녕하세요 {userData.userNickname}님</StyledText2>
          </NameBox>
          <MyBox>
            <Icon src={mypage} onClick={() => navigate("/mypage/edit")}></Icon>
            <StyledText2>프로필 수정</StyledText2>
          </MyBox>
        </ProfileContainer>
        <HorizontalLine2 />
        <ListContainer>
          <ContentBox
            onClick={() => {
              console.log("즐겨찾기 탭 클릭됨");
              setSelectedTab("즐겨찾기");
            }}
          >
            <StyledText>즐겨찾기</StyledText>
            <StyledText>({userData.countMyBookmark})</StyledText>
          </ContentBox>
          <ContentBox
            onClick={() => {
              console.log("리뷰 탭 클릭됨");
              setSelectedTab("리뷰");
            }}
          >
            <StyledText>리뷰</StyledText>
            <StyledText>({userData.countMyReview})</StyledText>
          </ContentBox>
          <ContentBox
            onClick={() => {
              console.log("좋아요 탭 클릭됨");
              setSelectedTab("좋아요");
            }}
          >
            <StyledText>좋아요</StyledText>
            <StyledText>({userData.countMyHeart})</StyledText>
          </ContentBox>
          <ContentBox
            onClick={() => {
              console.log("작성한 글 탭 클릭됨");
              setSelectedTab("작성한 글");
            }}
          >
            <StyledText>작성한 글</StyledText>
            <StyledText>({userData.countMyPost})</StyledText>
          </ContentBox>
          <ContentBox
            onClick={() => {
              console.log("댓글 탭 클릭됨");
              setSelectedTab("댓글");
            }}
          >
            <StyledText>댓글</StyledText>
            <StyledText>({userData.countMyScrap})</StyledText>
          </ContentBox>
        </ListContainer>
        <HorizontalLine2 />
        <FoodContainer>{renderContent()}</FoodContainer>
      </Layout>
    </>
  );
};

export default Mypage;
