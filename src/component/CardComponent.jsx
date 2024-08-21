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
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e0e7ff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContent = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StoreTitle = styled(Link)`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  text-decoration: none;
  color: black;
`;

const StoreLocation = styled.p`
  font-size: 14px;
  color: #555555;
  margin: 4px 0;
`;

const StoreMenu = styled.p`
  font-size: 12px;
  color: #888888;
  margin: 0;
`;

const CardStats = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
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

  const storeId = "store1"; // 여기서 각 가게의 고유 ID를 설정합니다

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
      <CardImage>
        <img
          src="image-placeholder.png"
          alt="Thumbnail"
          style={{ width: "100%", height: "100%" }}
        />
      </CardImage>
      <CardContent>
        <StoreTitle to={`/store/${storeId}`}>가게이름</StoreTitle>
        <StoreLocation>가게위치</StoreLocation>
        <StoreMenu>메뉴</StoreMenu>
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
      </CardContent>
    </Card>
  );
};

export default CardComponent;
