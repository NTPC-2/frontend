import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineStar,
  AiFillStar,
  AiOutlineMessage,
} from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getCookie } from "../../utils/UseCookies";

// 스타일 임포트
import {
  GlobalStyle,
  PageContainer,
  ImageSection,
  Image,
  PrevButton,
  NextButton,
  StoreTitleSection,
  StoreTitle,
  RatingSection,
  StatItem,
  InfoContainer,
  MapSection,
  InfoBox,
  InfoSection,
  InfoTitle,
  InfoContent,
  ReviewSection,
  ReviewCard,
  ReviewerName,
  ReviewText,
  ReviewFooter,
} from "./FoodDetailPage.styles";

const FoodDetailPage = () => {
  const { storeId } = useParams();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태

  useEffect(() => {
    const token = getCookie("authToken");
    setIsLogin(!!token); // 토큰이 있으면 로그인 상태로 설정

    const fetchStoreData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/restaurant/${storeId}`);
        setStoreData(response.data.data);
        setLiked(response.data.data.isHeart);
        setFavorited(response.data.data.isBookmark);
      } catch (error) {
        console.error("Error fetching store data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [storeId]);

  if (loading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (!storeData) {
    return <PageContainer>Store not found</PageContainer>;
  }

  const handleLike = async () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const token = getCookie("authToken");
      const response = await axios({
        method: liked ? "patch" : "post",
        url: `http://localhost:8080/restaurant/${storeId}/${liked ? "removeheart" : "addheart"}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setLiked(!liked);
        setStoreData((prevState) => ({
          ...prevState,
          count_heart: liked ? prevState.count_heart - 1 : prevState.count_heart + 1,
        }));
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleFavorite = async () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const token = getCookie("authToken");
      const response = await axios({
        method: favorited ? "patch" : "post",
        url: `http://localhost:8080/restaurant/${storeId}/${favorited ? "removebookmark" : "addbookmark"}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setFavorited(!favorited);
        setStoreData((prevState) => ({
          ...prevState,
          count_bookmark: favorited ? prevState.count_bookmark - 1 : prevState.count_bookmark + 1,
        }));
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const {
    restaurantName,
    mainImg,
    count_heart,
    count_bookmark,
    count_review,
    menuMap,
    address,
    phoneNumber,
  } = storeData;

  return (
    <>
      <GlobalStyle /> {/* GlobalStyle 적용 */}
      <PageContainer>
        <ImageSection>
          <PrevButton>
            <FaChevronLeft />
          </PrevButton>
          <Image src={mainImg || "image-placeholder.png"} alt={restaurantName} />
          <NextButton>
            <FaChevronRight />
          </NextButton>
        </ImageSection>

        <StoreTitleSection>
          <div>
            <StoreTitle>{restaurantName}</StoreTitle>
          </div>
          <RatingSection>
            <StatItem onClick={handleLike}>
              {liked ? (
                <AiFillHeart style={{ color: "red", marginRight: "5px" }} />
              ) : (
                <AiOutlineHeart style={{ color: "grey", marginRight: "5px" }} />
              )}
              {count_heart}
            </StatItem>
            <StatItem onClick={handleFavorite}>
              {favorited ? (
                <AiFillStar style={{ color: "gold", marginRight: "5px" }} />
              ) : (
                <AiOutlineStar style={{ color: "grey", marginRight: "5px" }} />
              )}
              {count_bookmark}
            </StatItem>
            <StatItem>
              <AiOutlineMessage style={{ color: "grey", marginRight: "5px" }} />
              {count_review}
            </StatItem>
          </RatingSection>
        </StoreTitleSection>

        <InfoContainer>
          <MapSection>위치 지도 (Map Placeholder)</MapSection>
        </InfoContainer>

        <InfoSection>
          <InfoTitle>매장 소개</InfoTitle>
          <InfoContent>{storeData.details}</InfoContent>
        </InfoSection>

        <InfoBox>
          <InfoTitle>매장 정보</InfoTitle>
          <InfoContent>전화번호: {phoneNumber}</InfoContent>
          <InfoContent>주소: {address}</InfoContent>
        </InfoBox>

        <InfoSection>
          <InfoTitle>메뉴</InfoTitle>
          <InfoContent>
            {menuMap &&
              Object.entries(menuMap).map(([menu, price], index) => (
                <p key={index}>
                  {menu}: {price.toLocaleString()}원
                </p>
              ))}
          </InfoContent>
        </InfoSection>

        {isLogin ? (
          <ReviewSection>
            <ReviewCard>
              <ReviewerName>홍길동</ReviewerName>
              <ReviewText>정말 맛있습니다!</ReviewText>
            </ReviewCard>
            <ReviewFooter>리뷰 더보기 &gt;</ReviewFooter>
          </ReviewSection>
        ) : (
          <InfoSection>
            <InfoTitle>리뷰</InfoTitle>
            <InfoContent>리뷰를 보려면 로그인이 필요합니다.</InfoContent>
          </InfoSection>
        )}
      </PageContainer>
    </>
  );
};

export default FoodDetailPage;
