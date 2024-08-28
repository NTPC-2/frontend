// import { useState } from "react";
// import * as S from "./DetailStyle";

// const PostDetailPage = ({ post, onBackToList }) => {
//   const [comments, setComments] = useState(post.comments || []);
//   const [newComment, setNewComment] = useState("");
//   const [likes, setLikes] = useState(post.likes || 0);

//   const handleAddComment = () => {
//     if (newComment.trim() !== "") {
//       setComments([...comments, newComment]);
//       setNewComment("");
//     }
//   };

//   const handleLike = () => {
//     setLikes(likes + 1);
//   };

//   return (
//     <S.PostDetailContainer>
//       <S.TitleBar>{post.title}</S.TitleBar>
//       <S.PostInfo>
//         <S.Author>{post.author}</S.Author>
//         <S.PostDate>{post.date}</S.PostDate>
//       </S.PostInfo>
//       <S.PostContent>{post.content}</S.PostContent>
//       <S.LikeButton onClick={handleLike}>좋아요 {likes}</S.LikeButton>
//       <S.CommentSection>
//         <S.CommentInput
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="댓글을 입력하세요."
//         />
//         <S.CommentButton onClick={handleAddComment}>댓글 달기</S.CommentButton>
//         <S.CommentsList>
//           {comments.map((comment, index) => (
//             <S.Comment key={index}>{comment}</S.Comment>
//           ))}
//         </S.CommentsList>
//       </S.CommentSection>
//       <S.BackButton onClick={onBackToList}>글 목록</S.BackButton>
//     </S.PostDetailContainer>
//   );
// };

// export default PostDetailPage;
