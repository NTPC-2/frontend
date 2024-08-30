import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import CommentIcon from "../../assets/댓글이게.png"; // 댓글 아이콘
import ScrapIcon from "../../assets/스크랩.png"; // 스크랩 아이콘
import HeartIcon from "../../assets/하트.png"; // 좋아요 아이콘

// Styled Components
const PostDetailContainer = styled.div`
  background-color: #fafafa;
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 20px;
  border-radius: 10px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 20px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  float: right;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AuthorImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const AuthorName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Timeline = styled.p`
  font-size: 14px;
  color: #888;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const PostImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 10px;
  object-fit: cover;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
`;

const IconButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const CommentSection = styled.div`
  margin-top: 20px;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const CommentContent = styled.div`
  margin-left: 10px;
  flex: 1;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
`;

const CommentText = styled.p`
  margin: 5px 0;
`;

const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReplyButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
`;

const CommentForm = styled.form`
  display: flex;
  margin-top: 10px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const PostDetail = ({ selectedPost, onClose }) => {
  const [isLiked, setIsLiked] = useState(selectedPost.isMyLike);
  const [isScrapped, setIsScrapped] = useState(selectedPost.isMyScrap);
  const [likeCount, setLikeCount] = useState(selectedPost.countLike);
  const [scrapCount, setScrapCount] = useState(selectedPost.countScrap);
  const [comments, setComments] = useState(
    selectedPost.commentInfoDtoList || []
  );
  const [commentText, setCommentText] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  const accessToken = localStorage.getItem("accessToken"); // 토큰을 로컬스토리지에서 가져옴

  const handleLikeClick = async () => {
    try {
      const url = isLiked
        ? `http://43.201.247.254:8080/post/removepostlike/${selectedPost.postId}`
        : `http://43.201.247.254:8080/addpostlike/${selectedPost.postId}`;

      const method = isLiked ? "PATCH" : "POST";
      const response = await axios({
        method: method,
        url: url,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success) {
        setIsLiked(!isLiked);
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
        console.log("게시글 좋아요/취소 처리 성공!");
      }
    } catch (error) {
      console.error("게시물 좋아요/취소 처리 에러:", error);
    }
  };

  const handleScrapClick = async () => {
    try {
      const url = isScrapped
        ? `http://43.201.247.254:8080/post/removepostscrap/${selectedPost.postId}` // 스크랩 취소
        : `http://43.201.247.254:8080/post/addpostscrap/${selectedPost.postId}`; // 스크랩 추가

      const method = isScrapped ? "PATCH" : "POST";

      const response = await axios({
        method: method,
        url: url,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success) {
        setIsScrapped(!isScrapped);
        setScrapCount((prevCount) =>
          isScrapped ? prevCount - 1 : prevCount + 1
        );
        console.log("게시글 스크랩/취소 처리 성공!");
      } else {
        console.error("게시글 스크랩/취소 처리 실패:", response.data.message);
      }
    } catch (error) {
      console.error("게시글 스크랩/취소 처리 에러:", error);
    }
  };

  const handleCommentClick = () => {
    setShowCommentForm(!showCommentForm);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://43.201.247.254:8080/comment/create/${selectedPost.postId}`,
        { contents: commentText },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const newComment = response.data.data;
        setComments((prevComments) => [...prevComments, newComment]);
        setCommentText("");
        setShowCommentForm(false);
        console.log("댓글 작성 성공!");
      } else {
        console.error("댓글 작성 실패:", response.data.message);
      }
    } catch (error) {
      console.error("댓글 작성 에러:", error);
    }
  };

  const handleCommentLikeClick = async (commentId, isLiked) => {
    try {
      const url = isLiked
        ? `http://43.201.247.254:8080/comment/removelike/${commentId}` // 좋아요 해제 API
        : `http://43.201.247.254:8080/comment/addcommentlike/${commentId}`; // 좋아요 API

      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.commentId === commentId
              ? {
                  ...comment,
                  countLike: isLiked
                    ? comment.countLike - 1
                    : comment.countLike + 1,
                  isMyLike: !isLiked,
                }
              : comment
          )
        );
        console.log("댓글 좋아요/취소 성공");
      } else {
        console.error("댓글 좋아요/취소 처리 실패:", response.data.message);
      }
    } catch (error) {
      console.error("댓글 좋아요/취소 처리 에러:", error);
    }
  };

  const handleImageLoadError = (e) => {
    e.target.src = "경로/대체이미지.png"; // 대체 이미지 경로 설정
  };

  return (
    <PostDetailContainer>
      {selectedPost.postImgUrl && (
        <PostImage
          src={selectedPost.postImgUrl}
          alt="Post Image"
          onError={handleImageLoadError}
        />
      )}
      <ContentSection>
        <CloseButton onClick={onClose}>X</CloseButton>
        <AuthorSection>
          <AuthorImage
            src={selectedPost.userImgUrl}
            alt="Author"
            onError={handleImageLoadError}
          />
          <div>
            <AuthorName>{selectedPost.authorName}</AuthorName>
            <Timeline>{selectedPost.timeLine}</Timeline>
          </div>
        </AuthorSection>
        <Title>{selectedPost.topic}</Title>
        <Content>{selectedPost.contents}</Content>
        <ButtonGroup>
          <div>
            <IconButton
              src={HeartIcon}
              alt="좋아요"
              onClick={handleLikeClick}
            />
            <span>{likeCount}</span>
          </div>
          <div>
            <IconButton
              src={CommentIcon}
              alt="댓글 달기"
              onClick={handleCommentClick}
            />
            <span>{selectedPost.countComment}</span>
          </div>
          <div>
            <IconButton
              src={ScrapIcon}
              alt="스크랩"
              onClick={handleScrapClick}
            />
            <span>{scrapCount}</span>
          </div>
        </ButtonGroup>

        <CommentSection>
          {comments.map((comment) => (
            <CommentItem key={comment.commentId}>
              <AuthorImage
                src={comment.userImgUrl}
                alt="User"
                onError={handleImageLoadError}
              />
              <CommentContent>
                <CommentAuthor>{comment.nickname}</CommentAuthor>
                <CommentText>{comment.contents}</CommentText>
                <Timeline>{comment.timeLine}</Timeline>
                <CommentActions>
                  <IconButton
                    src={HeartIcon}
                    alt="댓글 좋아요"
                    onClick={() =>
                      handleCommentLikeClick(
                        comment.commentId,
                        comment.isMyLike
                      )
                    }
                  />
                  <span>{comment.countLike}</span>
                  <ReplyButton onClick={() => setShowCommentForm(true)}>
                    답글 달기
                  </ReplyButton>
                </CommentActions>
              </CommentContent>
            </CommentItem>
          ))}

          {showCommentForm && (
            <CommentForm onSubmit={handleCommentSubmit}>
              <CommentInput
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="댓글을 입력하세요..."
              />
              <SubmitButton type="submit">댓글 달기</SubmitButton>
            </CommentForm>
          )}
        </CommentSection>
      </ContentSection>
    </PostDetailContainer>
  );
};

PostDetail.propTypes = {
  selectedPost: PropTypes.shape({
    postId: PropTypes.number.isRequired,
    authorName: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    countComment: PropTypes.number.isRequired,
    countLike: PropTypes.number.isRequired,
    countScrap: PropTypes.number.isRequired,
    isMyLike: PropTypes.bool.isRequired,
    isMyScrap: PropTypes.bool.isRequired,
    postImgUrl: PropTypes.string,
    timeLine: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    userImgUrl: PropTypes.string.isRequired,
    commentInfoDtoList: PropTypes.arrayOf(
      PropTypes.shape({
        commentId: PropTypes.number.isRequired,
        userId: PropTypes.number.isRequired,
        nickname: PropTypes.string.isRequired,
        userImgUrl: PropTypes.string.isRequired,
        commentLevel: PropTypes.number,
        contents: PropTypes.string.isRequired,
        countLike: PropTypes.number.isRequired,
        isMyLike: PropTypes.bool.isRequired,
        timeLine: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PostDetail;
