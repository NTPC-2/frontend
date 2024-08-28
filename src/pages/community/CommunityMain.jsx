import Write from "../../assets/Write.png";
import PosterBox from "../../component/PosterBar";
import { createGlobalStyle } from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import * as S from "./CommunityStyle";
import WritePost from "./WritePost";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* X축 스크롤 제거 */
  }
`;

// Communitypage 컴포넌트 정의
const Communitypage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPosts, setTotlaPosts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const posts_page = 10;

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/post/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
    };
    fetchPosts();
  }, [currentPage]);

  const handleIconClick = () => {
    console.log("Icon clicked"); // 아이콘 클릭 시 콘솔에 로그 출력
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

            {loading ? (
              <p>Loading...</p>
            ) : posts.length === 0 ? ( // 게시물이 없는 경우 문구 출력
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
                />
              ))
            )}
            {currentPage * posts_page < totalPosts && (
              <S.NextPageButton onClick={handleNextPage}>
                다음 페이지
              </S.NextPageButton>
            )}
          </S.LeftContentBox>
          <S.RightContentBox>
            <S.PopularPostContent />
            <S.RecentReviews />
            <S.RanckingContent />
          </S.RightContentBox>
        </S.ContentContainer>
      </S.Layout>
    </>
  );
};

export default Communitypage;
