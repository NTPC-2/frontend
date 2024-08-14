import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import CardComponent from "../component/CardComponent";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* x축 스크롤 제거 */
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuBarContainer = styled.div`
  width: 675px;
  margin-top: 5%; /* Navbar의 높이만큼 margin-top 추가 */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  z-index: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px;
`;

const MenuItem = styled(Link)`
  color: gray;
  text-decoration: none;
  font-size: 13px;

  &:hover {
    color: #424242;
    text-decoration: underline; /* 선택사항: 마우스 올렸을 때 밑줄을 추가 */
  }
`;

const RouletteLink = styled(Link)`
  margin-top: 15px;
  height: 500px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  border-radius: 50%; /* 원형으로 만들기 */
  text-decoration: none;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 250px;
    height: 250px;
    background-color: #ffcc00;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  &:after {
    content: '🎯 룰렛 돌리기';
    position: absolute;
    color: #000;
    font-size: 24px;
    font-weight: bold;
  }
`;

const StyledTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
`;

const StyledText = styled.div`
  margin-left: 40px;
  display: flex;
  width: 319px;
  height: 64px;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px; /* 240% */
  letter-spacing: 0.2px;
  text-transform: capitalize;
  flex-direction: column;
  justify-content: center;
`;

const FoodContainer = styled.div`
  height: 500px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: center;
  padding: 20px;
`;

const CommunityContainer = styled.div`
  height: 500px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: center;
  padding: 20px;
  background-color: gray;
`;

const Mainpage = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <MenuBarContainer>
          <ContentContainer>
            <MenuItem to="/categories/all">전체</MenuItem>
          </ContentContainer>
          <ContentContainer>
            <MenuItem to="/categories/hansik">한식</MenuItem>
          </ContentContainer>
          <ContentContainer>
            <MenuItem to="/categories/western">양식</MenuItem>
          </ContentContainer>
          <ContentContainer>
            <MenuItem to="/categories/grill">고기/구이</MenuItem>
          </ContentContainer>
          <ContentContainer>
            <MenuItem to="/categories/japanese">일식</MenuItem>
          </ContentContainer>
          <ContentContainer>
            <MenuItem to="/categories/Chinese">중식</MenuItem>
          </ContentContainer>
          <ContentContainer>
            <MenuItem to="/categories/cafe">카페</MenuItem>
          </ContentContainer>
          <ContentContainer>
            <MenuItem to="/categories/bar">술집</MenuItem>
          </ContentContainer>
        </MenuBarContainer>
        <RouletteLink to="/roulette" />
        <StyledTextContainer>
          <StyledText>지금 뜨는 음식점</StyledText>
        </StyledTextContainer>
        <FoodContainer>
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </FoodContainer>
        <StyledTextContainer>
          <StyledText>지금 뜨는 인기글</StyledText>
        </StyledTextContainer>
        <CommunityContainer></CommunityContainer>
      </Layout>
    </>
  );
};

export default Mainpage;
