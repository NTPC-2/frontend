import styled from "styled-components";
import Write from "../assets/Write.png";
import PosterBox from "../component/PosterBar";
import { createGlobalStyle } from "styled-components";

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

const TitleBar = styled.div`
  margin-top: 5%;
  width: 100%;
  height: 62px;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ContentContainer = styled.div`
  margin-top: 100px;
  display: flex;
  gap: 20px;
`;
const LeftCotentBox = styled.div`
  display: flex;
  width: 750px;
  height: 100%;
  flex-direction: column;

  gap: 80px;
`;
const RightContentBox = styled.div`
  width: 460px;
  height: 980px;
  display: flex;
  flex-direction: column;
  background-color: #d9d9d9;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const WritePostBar = styled.div`
  width: 750px;
  height: 60px;
  background-color: #d9d9d9;
  display: flex;
  color: #000;

  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
`;
const TitleBar2 = styled.div`
  width: 750px;
  height: 89px;
  border: 3px #000 solid;
  display: flex;
  color: #000;

  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
`;
const PopularPostContent = styled.div`
  width: 399px;
  height: 149px;
  flex-shrink: 0;
  background-color: #fff;
`;

const RecentReviews = styled.div`
  width: 399px;
  height: 149px;
  flex-shrink: 0;
  background-color: #fff;
`;

const RanckingContent = styled.div`
  width: 399px;
  height: 370px;
  flex-shrink: 0;
  background-color: #fff;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 15px;

  &:hover {
    transform: scale(1.1);
  }
  margin-left: 500px;
`;
const Communitypage = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <TitleBar>인슐랭 커뮤니티</TitleBar>
        <ContentContainer>
          <LeftCotentBox>
            <TitleBar2>자유게시판</TitleBar2>
            <WritePostBar>
              새 글을 작성해주세요!
              <Icon src={Write}></Icon>
            </WritePostBar>
            <PosterBox />
            <PosterBox />
            <PosterBox />
            <PosterBox />
          </LeftCotentBox>
          <RightContentBox>
            <PopularPostContent></PopularPostContent>
            <RecentReviews></RecentReviews>
            <RanckingContent></RanckingContent>
          </RightContentBox>
        </ContentContainer>
      </Layout>
    </>
  );
};

export default Communitypage;
