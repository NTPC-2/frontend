import Write from "../../assets/Write.png";
import PosterBox from "../../component/PosterBar";
import { createGlobalStyle, styled } from "styled-components";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import * as S from "./CommunityStyle";
import WritePost from "./WritePost";
import PostDetail from "./PostDetail";
import { PopularPostCard } from "./PopularPost"; // Import the new components
import { RestaurantCard } from "./RestaurantCard"; // Import the new components

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* X축 스크롤 제거 */
  }
`;
const Heading = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Communitypage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPosts, setTotlaPosts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const posts_page = 10;
  const [selectedPost, setSelectedPost] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const [popularPosts, setPopularPosts] = useState([]);
  const [rankingContent, setRankingContent] = useState([]);

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
        setTotlaPosts(response.data.data.countPost);
        setPosts(response.data.data.postSummaryDtoList);
      } else {
        console.error("게시물 가져오기 실패:", response.data.message);
      }
    } catch (error) {
      console.error("게시물 가져오기 : 에러 발생 ", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken, currentPage]);

  const fetchRightContentData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data.data);
      const { popularPostDtoList, popularRestaurantInterfaceList } =
        response.data.data;

      setPopularPosts(popularPostDtoList.slice(0, 2)); // Display only 2 popular posts
      setRankingContent(popularRestaurantInterfaceList.slice(0, 7)); // Display only 2 ranking restaurants
    } catch (error) {
      console.error("오른쪽 컨텐츠 데이터를 가져오는 중 오류 발생", error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchPosts();
    fetchRightContentData();
  }, [fetchPosts, fetchRightContentData]);

  const handleIconClick = () => {
    setIsWriting((prev) => !prev);
  };

  const handlePostCreated = () => {
    setIsWriting(false);
    fetchPosts();
  };

  const handleNextPage = () => {
    if (currentPage * posts_page < totalPosts) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePostClick = async (postId) => {
    try {
      const response = await axios.get(
        `http://43.201.247.254:8080/post/details/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        const postData = response.data.data;
        setSelectedPost({
          ...postData.postInfoDto, // 기존 postInfoDto 데이터
          commentInfoDtoList: postData.commentInfoDtoList, // 추가된 댓글 목록
        });
        console.log("게시물 상세 가져오기 성공");
        console.log(response.data.data);
      } else {
        console.error("게시물 상세 가져오기 실패:", response.data.message);
      }
    } catch (error) {
      console.error("게시물 상세 가져오기 : 에러 발생", error);
    }
  };

  const handleClosePostDetail = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <GlobalStyle />
      <S.Layout>
        <S.TitleBar>인슐랭 커뮤니티</S.TitleBar>
        <S.ContentContainer>
          <S.LeftContentBox>
            <S.TitleBar2>자유게시판</S.TitleBar2>
            <S.WritePostBar>
              새 글을 작성해주세요!
              <S.Icon src={Write} onClick={handleIconClick} />
            </S.WritePostBar>

            {isWriting && (
              <WritePost
                onClose={() => setIsWriting(false)}
                onPostCreated={handlePostCreated}
              />
            )}

            {selectedPost ? (
              <PostDetail
                selectedPost={selectedPost} // 모든 데이터를 포함한 selectedPost
                onClose={handleClosePostDetail}
              />
            ) : (
              <>
                {loading ? (
                  <p>Loading...</p>
                ) : posts.length === 0 ? (
                  <p>게시물이 존재하지 않습니다.</p>
                ) : (
                  posts.map((post) => (
                    <PosterBox
                      key={post.postId}
                      title={post.topic}
                      content={post.contentsSnippet}
                      author={post.authorName}
                      date={new Date().toLocaleDateString()}
                      countLike={post.countLike}
                      countComment={post.countComment}
                      countScrap={post.countScrap}
                      onClick={() => handlePostClick(post.postId)}
                    />
                  ))
                )}
                {currentPage * posts_page < totalPosts && (
                  <S.ButtonBox>
                    <S.NextPageButton onClick={handleNextPage}>
                      다음 페이지
                    </S.NextPageButton>
                  </S.ButtonBox>
                )}
              </>
            )}
          </S.LeftContentBox>
          <S.RightContentBox>
            <Heading>실시간 인기 게시물</Heading>
            <S.PopularPostContent>
              {popularPosts.map((post) => (
                <PopularPostCard key={post.postId} post={post} />
              ))}
            </S.PopularPostContent>
            <Heading>HOT 음식점</Heading>
            <S.RanckingContent>
              {rankingContent.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.restaurantId}
                  restaurant={restaurant}
                />
              ))}
            </S.RanckingContent>
          </S.RightContentBox>
        </S.ContentContainer>
      </S.Layout>
    </>
  );
};

export default Communitypage;
