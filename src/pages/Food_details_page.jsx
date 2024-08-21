import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineStar, AiFillStar, AiOutlineMessage } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PageContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ImageSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 600px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #ddd;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const PrevButton = styled(NavButton)`
  left: 10px;
`;

const NextButton = styled(NavButton)`
  right: 10px;
`;

const StoreTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  padding: 20px;
`;

const StoreTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  text-align: left;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
`;

const StatItem = styled.span`
  margin: 0 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
`;

const StoreSubtitle = styled.p`
  font-size: 16px;
  color: #777777;
  margin: 5px 0;
`;

const MapSection = styled.div`
  background-color: #f0f0f0;
  height: 300px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777777;
  font-size: 18px;
  border: 2px solid #ddd;
`;

const InfoSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
`;

const InfoTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InfoContent = styled.p`
  font-size: 16px;
  color: #666666;
  margin: 0;
`;

const ReviewSection = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #ddd;
  margin-bottom: 20px;
`;

const ReviewCard = styled.div`
  background-color: #e7f4ff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 2px solid #ddd;
`;

const ReviewerName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px;
`;

const ReviewText = styled.p`
  font-size: 14px;
  color: #555555;
  margin: 0;
`;

const ReviewFooter = styled.div`
  text-align: right;
  padding: 10px;
  font-size: 14px;
  color: #555555;
`;

const FoodDetailPage = () => {
  const { storeId } = useParams(); // URL에서 storeId 가져오기
  const [likes, setLikes] = useState(345); // 초기 좋아요 수 설정
  const [favorites, setFavorites] = useState(215); // 초기 즐겨찾기 수 설정
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [favorited, setFavorited] = useState(false); // 즐겨찾기 상태
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 이미지 슬라이더 인덱스

  const handleLike = () => {
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    setLiked((prevLiked) => !prevLiked);
  };

  const handleFavorite = () => {
    setFavorites((prevFavorites) => (favorited ? prevFavorites - 1 : prevFavorites + 1));
    setFavorited((prevFavorited) => !prevFavorited);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? store.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === store.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 가게 데이터 임시로 하드코딩
  const storeData = {
    store1: {
      title: "가메이",
      subtitle: "부드러운 연어 덮밥이 유명한 일식집",
      images: [
        "https://via.placeholder.com/600x400", // 이미지 1 URL
        "https://via.placeholder.com/600x400", // 이미지 2 URL
      ],
      reviewCount: 32,
      introduction: "가메이는 일식 전문점으로, 신선한 재료를 사용하여 품질 높은 음식을 제공합니다.",
      openingHours: "일반: 오전 10:00 ~ 오후 9:00 (매주 일요일 휴무)",
      reviews: [{ reviewer: "홍길동 02", text: "너무 맛있어요~" }],
    },
    // 추가적인 가게 데이터 추가 가능
  };

  const store = storeData[storeId] || {
    title: "가게를 찾을 수 없습니다",
    subtitle: "",
    images: [],
    reviewCount: 0,
    introduction: "",
    openingHours: "",
    reviews: [],
  };

  return (
    <PageContainer>
      <ImageSection>
        <PrevButton onClick={handlePrevImage}>
          <FaChevronLeft />
        </PrevButton>
        <Image src={store.images[currentImageIndex]} alt={`Store Image ${currentImageIndex + 1}`} />
        <NextButton onClick={handleNextImage}>
          <FaChevronRight />
        </NextButton>
      </ImageSection>

      <StoreTitleSection>
        <div>
          <StoreTitle>{store.title} <span style={{ fontWeight: 'normal', fontSize: '18px' }}>{store.rating}</span></StoreTitle>
          <StoreSubtitle>{store.subtitle}</StoreSubtitle>
        </div>
        <RatingSection>
          <StatItem onClick={handleLike}>
            {liked ? (
              <AiFillHeart style={{ color: "red", marginRight: "5px" }} />
            ) : (
              <AiOutlineHeart style={{ color: "grey", marginRight: "5px" }} />
            )}
            {likes}
          </StatItem>
          <StatItem onClick={handleFavorite}>
            {favorited ? (
              <AiFillStar style={{ color: "gold", marginRight: "5px" }} />
            ) : (
              <AiOutlineStar style={{ color: "grey", marginRight: "5px" }} />
            )}
            {favorites}
          </StatItem>
          <StatItem>
            <AiOutlineMessage style={{ marginRight: "5px" }} /> 리뷰 {store.reviewCount}
          </StatItem>
        </RatingSection>
      </StoreTitleSection>

      <MapSection>위치 지도 (Map Placeholder)</MapSection>

      <InfoSection>
        <InfoTitle>매장소개</InfoTitle>
        <InfoContent>{store.introduction}</InfoContent>
      </InfoSection>

      <InfoSection>
        <InfoTitle>영업시간</InfoTitle>
        <InfoContent>{store.openingHours}</InfoContent>
      </InfoSection>

      <ReviewSection>
        {store.reviews.map((review, index) => (
          <ReviewCard key={index}>
            <ReviewerName>{review.reviewer}</ReviewerName>
            <ReviewText>{review.text}</ReviewText>
          </ReviewCard>
        ))}
      </ReviewSection>

      <ReviewFooter>리뷰 더보기 &gt;</ReviewFooter>
    </PageContainer>
  );
};

export default FoodDetailPage;
