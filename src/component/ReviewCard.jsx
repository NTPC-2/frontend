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

// 카드 스타일
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

// 이미지 스타일
const CardImage = styled.div`
  width: 100%;
  height: 150px;
  background-color: #e0e7ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 15px;
`;

const CardImageContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 내용 스타일
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// 제목 스타일
const ReviewTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

// 내용 스타일
const ReviewBody = styled.p`
  font-size: 14px;
  color: #555555;
  margin: 10px 0;
`;

// 작성자 및 날짜 스타일
const ReviewAuthor = styled.p`
  font-size: 12px;
  color: #888888;
  margin: 0;
`;

const ReviewDate = styled.p`
  font-size: 12px;
  color: #888888;
  margin: 0;
`;

// 카드 통계 스타일
const CardStats = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`;

// 리뷰 통계 스타일
const ReviewStat = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555555;
  margin-right: 10px;
  cursor: pointer;
`;

// 별 개수를 나타내는 컴포넌트
const Stars = ({ count }) => {
  const stars = Array(5)
    .fill(false)
    .map((_, index) => index < count);
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {" "}
      {/* Flexbox를 사용하여 별을 가로로 배치 */}
      {stars.map((filled, index) =>
        filled ? (
          <AiFillStar key={index} style={{ color: "gold" }} />
        ) : (
          <AiOutlineStar key={index} style={{ color: "grey" }} />
        )
      )}
    </div>
  );
};

// 리뷰 카드 컴포넌트
const ReviewCard = ({ review }) => {
  const [likes, setLikes] = useState(0);
  const [favorites, setFavorites] = useState(0);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

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
        {review.imgList.length > 0 ? (
          <CardImageContent
            src={review.imgList[0]} // 첫 번째 이미지를 표시합니다
            alt="Review Thumbnail"
          />
        ) : (
          <p>No Image</p> // 이미지가 없을 경우 기본 메시지
        )}
      </CardImage>
      <CardContent>
        <ReviewTitle>{review.restaurantName}</ReviewTitle>
        <Stars count={review.star} /> {/* 별 개수를 표시 */}
        <ReviewBody>{review.contents}</ReviewBody>
        <ReviewAuthor>{review.userNickname}</ReviewAuthor>
        <ReviewDate>{review.timeLine}</ReviewDate>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
