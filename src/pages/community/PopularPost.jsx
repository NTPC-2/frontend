import styled from "styled-components";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineStar,
} from "react-icons/ai";

const PopularPostCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
`;

const PostTitle = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const PostContent = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

export const PopularPostCard = ({ post }) => {
  return (
    <PopularPostCardWrapper>
      <PostTitle>{post.topic}</PostTitle>
      <PostContent>{post.contents}</PostContent>
      <div>
        Likes: {post.countLike} | Scraps: {post.countScrap}
      </div>
    </PopularPostCardWrapper>
  );
};
