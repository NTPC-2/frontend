import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import CardComponent from '../component/CardComponent';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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
    text-decoration: underline;
  }
`;

const Spacer = styled.div`
  width: 100%;
  height: 200px; /* 흑색 상자의 높이 */
  background-color: #333; /* 흑색 상자 */
  margin-top: 20px;
`;

const CategoryContainer = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px; /* 최대 너비를 제한하여 중앙 정렬 */
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.h3`
  font-size: 16px;
  font-weight: normal;
  color: #888;
  margin-bottom: 20px;
`;

const FilterBar = styled.div`
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  color: gray;
  font-size: 14px;
`;

const CardsGrid = styled.div`
  display: flex;
  width: 100%;
  gap: 30px; /* 카드들 사이의 간격 */
`;

const StyledCardComponent = styled(CardComponent)`
  width: 33.33%; /* 화면의 1/3 너비로 설정 */
  height: 200px; /* 원하는 높이로 설정 */
  box-sizing: border-box; /* 박스 크기를 포함하여 패딩과 보더를 포함 */
`;

const Categories = () => {
  const { category } = useParams();

  const getCategoryTitle = (category) => {
    switch (category) {
      case 'hansik':
        return '한식';
      case 'western':
        return '양식';
      case 'grill':
        return '고기/구이';
      case 'japanese':
        return '일식';
      case 'chinese':
        return '중식';
      case 'cafe':
        return '카페';
      case 'bar':
        return '술집';
      default:
        return '전체';
    }
  };

  const categoryTitle = getCategoryTitle(category);

  return (
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
          <MenuItem to="/categories/chinese">중식</MenuItem>
        </ContentContainer>
        <ContentContainer>
          <MenuItem to="/categories/cafe">카페</MenuItem>
        </ContentContainer>
        <ContentContainer>
          <MenuItem to="/categories/bar">술집</MenuItem>
        </ContentContainer>
      </MenuBarContainer>
      <Spacer />
      <CategoryContainer>
        <Title>인하대 {categoryTitle} 맛집 결과</Title>
        <Subtitle>추천 맛집 (2곳)</Subtitle>
        <FilterBar>필터 추가</FilterBar>
        <CardsGrid>
          <StyledCardComponent title="가메이" description="인하대후문" />
          <StyledCardComponent title="콩불" description="인하대후문" />
        </CardsGrid>
      </CategoryContainer>
    </Layout>
  );
};

export default Categories;
