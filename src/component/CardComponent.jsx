import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineStar,
  AiFillStar,
  AiOutlineMessage,
} from "react-icons/ai";
import { getCookie } from "../utils/UseCookies";  // 쿠키에서 토큰을 가져오기 위해 사용

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

const StoreMenu = styled.p`
  font-size: 14px;
  color: #555555;
  margin: 4px 0;
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

const CardComponent = ({ store = {} }) => {
  if (!store || !store.restaurantName) {
    return null; // store 데이터가 유효하지 않으면 렌더링하지 않음
  }

  const {
    isLogin = false,
    isHeart = false,
    isBookmark = false,
    countHeart = 0,
    countBookmark = 0,
    countReview = 0,
    restaurantName = "Unknown",
    menuNames = "",
    mainImg = null,
    restaurantId,
  } = store;

  // 첫 번째 메뉴만 추출
  const firstMenu = menuNames.split(",")[0] || "메뉴 정보가 없습니다.";

  const [liked, setLiked] = useState(isHeart);
  const [favorited, setFavorited] = useState(isBookmark);
  const [likes, setLikes] = useState(countHeart);
  const [favorites, setFavorites] = useState(countBookmark);

  const handleLike = async () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const token = getCookie("authToken");  // 쿠키에서 토큰 가져오기
      const response = await axios({
        method: liked ? 'patch' : 'post',
        url: `http://localhost:8080/restaurant/${restaurantId}/${liked ? 'removeheart' : 'addheart'}`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        setLiked(!liked);  // 좋아요 상태 토글
        setLikes(liked ? likes - 1 : likes + 1);  // 좋아요 수 업데이트
      } else {
        console.error("좋아요 상태를 업데이트하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("좋아요 상태를 업데이트하는 중 오류가 발생했습니다:", error);
    }
  };

  const handleFavorite = async () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const token = getCookie("authToken");  // 쿠키에서 토큰 가져오기
      const response = await axios({
        method: favorited ? 'patch' : 'post',
        url: `http://localhost:8080/restaurant/${restaurantId}/${favorited ? 'removebookmark' : 'addbookmark'}`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        setFavorited(!favorited);
        setFavorites(favorited ? favorites - 1 : favorites + 1);
      } else {
        console.error("즐겨찾기 상태를 업데이트하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("즐겨찾기 상태를 업데이트하는 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <Card>
      <CardImage>
        <img
          src={mainImg || "image-placeholder.png"}
          alt={restaurantName}
          style={{ width: "100%", height: "100%" }}
        />
      </CardImage>
      <CardContent>
        <StoreTitle to={`/restaurant/${restaurantId}`}>{restaurantName}</StoreTitle>
        <StoreMenu>{firstMenu}</StoreMenu>
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
          <StoreStat>
            <AiOutlineMessage style={{ color: "grey" }} />
            {countReview}
          </StoreStat>
        </CardStats>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
