import { useState } from "react";
import styled from "styled-components";
import {
  AiFillStar,
  AiOutlineStar,
  AiFillEdit,
  AiFillDelete,
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
  position: relative;
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

// 별 개수를 나타내는 컴포넌트
const Stars = ({ count }) => {
  const stars = Array(5)
    .fill(false)
    .map((_, index) => index < count);
  return (
    <div style={{ display: "flex", gap: "4px" }}>
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

// 버튼 스타일 (아이콘 버튼)
const IconButton = styled.button`
  background: none;
  border: none;
  color: #888888;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  margin-left: 10px;

  &:hover {
    color: #000000;
  }

  &:disabled {
    cursor: not-allowed;
    color: #cccccc;
  }
`;

// 버튼 컨테이너 스타일 (카드의 우측 하단에 배치)
const ButtonContainer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  display: flex;
`;

const ReviewCard = ({ review, onEdit, onDelete, canEdit }) => {
  const [likes, setLikes] = useState(0);
  const [favorites, setFavorites] = useState(0);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const handleLike = () => {
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    setLiked((prevLiked) => !prevLiked);
  };

  const handleFavorite = () => {
    setFavorites((prevFavorites) =>
      favorited ? prevFavorites - 1 : prevFavorites + 1
    );
    setFavorited((prevFavorited) => !prevFavorited);
  };

  // 임의의 테스트 이미지 URL을 사용
  const testImageUrl =
    "https://elucidatorbucket.s3.ap-northeast-2.amazonaws.com/d25fd5bc-2sun.jpg";

  // 실제 리뷰 이미지가 없을 경우 테스트 이미지 사용
  const imageUrl =
    review.reviewImgList && review.reviewImgList.length > 0
      ? review.reviewImgList[0]
      : testImageUrl;

  return (
    <Card>
      <CardImage>
        <CardImageContent src={imageUrl} alt="Review Thumbnail" />
      </CardImage>
      <CardContent>
        <ReviewTitle>{review.restaurantName}</ReviewTitle>
        <Stars count={review.star} /> {/* 별 개수를 표시 */}
        <ReviewBody>{review.contents}</ReviewBody>
        <ReviewAuthor>작성자: {review.userNickname}</ReviewAuthor>
        <ReviewDate>{review.timeLine}</ReviewDate>
        {canEdit && (
          <ButtonContainer>
            <IconButton onClick={() => onEdit(review)} disabled={!canEdit}>
              <AiFillEdit />
            </IconButton>
            <IconButton
              onClick={() => onDelete(review.reviewId)}
              disabled={!canEdit}
            >
              <AiFillDelete />
            </IconButton>
          </ButtonContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
