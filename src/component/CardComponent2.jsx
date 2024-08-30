import { useState } from "react";
import styled from "styled-components";

import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 3px 5px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const StoreTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const StoreDescription = styled.p`
  font-size: 14px;
  color: #555555;
  margin: 10px 0;
`;

const StoreAuthor = styled.p`
  font-size: 12px;
  color: #888888;
  margin: 0;
`;

const StoreDate = styled.p`
  font-size: 12px;
  color: #888888;
  margin: 0;
`;

const CardStats = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StoreStat = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555555;
  margin-right: 10px;
  cursor: pointer;
`;

const CardComponent2 = ({
  postId,
  topic,
  contents,
  countLike,
  countComment,
  timeLine,
  userNickname,
  onPostClick, // Add this prop
}) => {
  const [likes, setLikes] = useState(countLike);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  return (
    <Card>
      <CardContent>
        <StoreTitle onClick={() => onPostClick(postId)}>{topic}</StoreTitle>
        <StoreDescription>{contents}</StoreDescription>
        <StoreAuthor>{userNickname}</StoreAuthor>
        <StoreDate>{timeLine}</StoreDate>
      </CardContent>
      <CardStats>
        <StoreStat onClick={handleLike}>
          {liked ? (
            <AiFillHeart style={{ color: "red" }} />
          ) : (
            <AiOutlineHeart style={{ color: "grey" }} />
          )}
          {likes}
        </StoreStat>
        <StoreStat>
          <AiOutlineMessage style={{ color: "grey" }} />
          {countComment}
        </StoreStat>
      </CardStats>
    </Card>
  );
};

export default CardComponent2;
