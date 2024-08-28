import styled from "styled-components";

// 상세 페이지 레이아웃
export const PostDetailContainer = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  margin: 16px 0;
`;

// 제목 표시
export const TitleBar = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

// 글쓴이 및 날짜 정보 표시
export const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

// 글쓴이 이름
export const Author = styled.span`
  font-weight: bold;
`;

// 게시 날짜
export const PostDate = styled.span`
  color: #888;
`;

// 글 내용 표시
export const PostContent = styled.p`
  font-size: 18px;
  margin-bottom: 24px;
`;

// 좋아요 버튼
export const LikeButton = styled.button`
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 24px;
`;

// 댓글 섹션
export const CommentSection = styled.div`
  margin-bottom: 24px;
`;

// 댓글 입력 필드
export const CommentInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// 댓글 달기 버튼
export const CommentButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
`;

// 댓글 목록
export const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
`;

// 개별 댓글
export const Comment = styled.li`
  padding: 8px;
  border-bottom: 1px solid #eee;
`;

// 글 목록 버튼
export const BackButton = styled.button`
  background-color: #f0f0f0;
  color: black;
  border: 1px solid #ccc;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
`;
