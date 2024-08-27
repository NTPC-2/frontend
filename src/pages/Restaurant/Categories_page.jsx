import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import CardComponent from '../../component/CardComponent';

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
  width: 100%;
`;

const MenuBarContainer = styled.div`
  width: 100%;
  max-width: 675px;
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

const Spacer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #333; /* 회색 박스 */
  margin-top: 20px;
`;

const CategoryContainer = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden; /* X축 스크롤 제거 */
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
  flex-wrap: wrap;
  justify-content: flex-start; /* 왼쪽에서 시작하여 카드 채우기 */
  width: 100%;
  gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;
`;

const StyledCardComponent = styled(CardComponent)`
  width: calc(33.33% - 20px); /* 3열 구성으로 설정, 간격을 고려하여 너비 설정 */
  max-width: 300px;
  height: auto;
  box-sizing: border-box;
`;

const Categories = () => {
  const { category } = useParams();
  const location = useLocation();
  const [restaurants, setRestaurants] = useState([]);

  // URL의 쿼리 파라미터에서 검색어 추출
  const query = new URLSearchParams(location.search).get('query');

  // 카테고리 ID와 이름 매핑
  const getCategoryTitle = (category) => {
    switch (category) {
      case 'all':
        return { id: 0, name: '전체' };
      case 'hansik':
        return { id: 1, name: '한식' };
      case 'western':
        return { id: 2, name: '양식' };
      case 'grill':
        return { id: 3, name: '고기/구이' };
      case 'japanese':
        return { id: 4, name: '일식' };
      case 'Chinese':
        return { id: 5, name: '중식' };
      case 'cafe':
        return { id: 6, name: '카페' };
      case 'bar':
        return { id: 7, name: '술집' };
      default:
        return { id: 0, name: '전체' };
    }
  };

  const { id: categoryId, name: categoryTitle } = getCategoryTitle(category);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        let response;
        if (query) {
          // 검색어가 있는 경우 검색 결과 가져오기
          response = await axios.get(`http://localhost:8080/restaurant/search/list?search=${query}`);
        } else {
          // 카테고리별 데이터 가져오기
          response = await axios.get(`http://localhost:8080/restaurant/list?category=${categoryId}`);
        }

        // API 응답에서 데이터 가져오기
        setRestaurants(response.data.data.restaurantSummaryDtoList);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [categoryId, query]);

  const displayTitle = query ? `검색 결과: "${query}"` : `인하대 ${categoryTitle} 맛집 결과`;

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
        <Spacer />
        <CategoryContainer>
          <Title>{displayTitle}</Title>
          <Subtitle>추천 맛집 ({restaurants.length}곳)</Subtitle>
          <FilterBar></FilterBar>
          <CardsGrid>
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <StyledCardComponent
                  key={restaurant.restaurantId}
                  store={restaurant}
                />
              ))
            ) : (
              <p>해당하는 가게는 없습니다.</p>
            )}
          </CardsGrid>
        </CategoryContainer>
      </Layout>
    </>
  );
};

export default Categories;
