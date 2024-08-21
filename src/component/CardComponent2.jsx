import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineStar,
  AiFillStar,
  AiOutlineMessage,
} from "react-icons/ai";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const StoreTitle = styled(Link)`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  text-decoration: none;
  color: black;
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

const CardComponent = () => {
  const [likes, setLikes] = useState(0);
  const [favorites, setFavorites] = useState(0);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const storeId = "store1"; // 각 가게의 고유 ID를 설정합니다

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleFavorite = () => {
    if (favorited) {
      setFavorites(favorites - 1);
    } else {
      setFavorites(favorites + 1);
    }
    setFavorited(!favorited);
  };

  return (
    <Card>
      <CardContent>
        <StoreTitle to={`/store/${storeId}`}>제목</StoreTitle>
        <StoreDescription>글의 내용</StoreDescription>
        <StoreAuthor>홍길동</StoreAuthor>
        <StoreDate>2024-08-21</StoreDate>
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
        <StoreStat onClick={handleFavorite}>
          {favorited ? (
            <AiFillStar style={{ color: "gold" }} />
          ) : (
            <AiOutlineStar style={{ color: "grey" }} />
          )}
          {favorites}
        </StoreStat>
        <StoreStat as={Link} to="/comments">
          <AiOutlineMessage style={{ color: "grey" }} />
        </StoreStat>
      </CardStats>
    </Card>
  );
};

export default CardComponent;
