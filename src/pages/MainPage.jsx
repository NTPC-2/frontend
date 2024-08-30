import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import CardComponent from "../component/CardComponent";
import CardComponent2 from "../component/CardComponent2";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  margin-top: 5%;
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

const RouletteLink = styled(Link)`
  margin-top: 15px;
  height: 500px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  border-radius: 50%;
  text-decoration: none;
  position: relative;

  &:before {
    content: "";
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
    content: "🎯 룰렛 돌리기";
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
  line-height: 48px;
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
`;

const Mainpage = () => {
  const [posts, setPosts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentPage = 1;
  const navigate = useNavigate();

  // Fetch access token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/post/list", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { page: currentPage },
      });

      if (response.data.success) {
        const sortedPosts = response.data.data.postSummaryDtoList.sort(
          (a, b) => b.countLike - a.countLike
        );
        setPosts(sortedPosts.slice(0, 6));
      } else {
        console.error("게시물 가져오기 실패:", response.data.message);
      }
    } catch (error) {
      console.error("게시물 가져오기 : 에러 발생 ", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken, currentPage]);

  const fetchRestaurants = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/restaurant/list",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: { category: 0 }, // Query parameter for category
        }
      );

      if (response.data.success) {
        const sortedRestaurants =
          response.data.data.restaurantSummaryDtoList.sort(
            (a, b) => b.countHeart - a.countHeart
          );
        setRestaurants(sortedRestaurants.slice(0, 6)); // Only take the top 6 restaurants
      } else {
        console.error("음식점 가져오기 실패:", response.data.message);
      }
    } catch (error) {
      console.error("음식점 가져오기 : 에러 발생 ", error);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchPosts();
      fetchRestaurants();
    } else {
      console.warn("Access token is missing.");
    }
  }, [fetchPosts, fetchRestaurants, accessToken]);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

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
          {/* Other MenuItems */}
        </MenuBarContainer>
        <RouletteLink to="/roulette" />
        <StyledTextContainer>
          <StyledText>지금 뜨는 음식점</StyledText>
        </StyledTextContainer>
        <FoodContainer>
          {restaurants.map((restaurant) => (
            <CardComponent key={restaurant.restaurantId} store={restaurant} />
          ))}
        </FoodContainer>
        <StyledTextContainer>
          <StyledText>지금 뜨는 인기글</StyledText>
        </StyledTextContainer>
        <CommunityContainer>
          {loading ? (
            <p>Loading...</p>
          ) : (
            posts.map((post) => (
              <CardComponent2
                key={post.postId}
                postId={post.postId}
                topic={post.topic}
                contents={post.contentsSnippet}
                countLike={post.countLike}
                countComment={post.countComment}
                timeLine={post.timeLine}
                userNickname={post.authorName}
                onPostClick={() => handlePostClick(post.postId)}
              />
            ))
          )}
        </CommunityContainer>
      </Layout>
    </>
  );
};

export default Mainpage;
