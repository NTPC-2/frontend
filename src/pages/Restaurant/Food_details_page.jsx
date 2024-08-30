import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Stars from "../../component/Stars";
import ReviewCard from "../../component/ReviewCard";
import ReviewForm from "../../component/ReviewForm";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillStar,
  AiOutlineStar,
  AiOutlineMessage,
} from "react-icons/ai";

import {
  GlobalStyle,
  PageContainer,
  ImageSection,
  Image,
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
  ReviewsGrid,
  BlurredSection,
} from "./FoodDetailPage.styles";

const FoodDetailPage = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [storeData, setStoreData] = useState(null);
  const [mainImg, setMainImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부 상태
  const [userNickname, setUserNickname] = useState(""); // 현재 로그인한 사용자의 닉네임 상태
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [isBookmarked, setIsBookmarked] = useState(false); // 즐겨찾기 상태
  const [editingReview, setEditingReview] = useState(null); // 현재 수정 중인 리뷰 상태

  const fetchStoreData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/restaurant/${storeId}`,
        {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {}, // 헤더에 토큰 포함 (로그인 상태일 때만)
        }
      );
      const data = response.data.data;

      setStoreData(data);
      setIsLogin(data.isLogin); // 로그인 여부 저장
      setIsLiked(data.isHeart); // 서버에서 전달받는 좋아요 상태 저장
      setIsBookmarked(data.isBookmark); // 서버에서 전달받는 즐겨찾기 상태 저장

      // 가게 이미지를 서버에서 받아오거나, 가게 정보에서 받아오는 로직 (기존 로직 유지)
      const searchResponse = await axios.get(
        `http://localhost:8080/restaurant/search/list?search=${data.restaurantName}`
      );
      if (
        searchResponse.data &&
        searchResponse.data.data.restaurantSummaryDtoList.length > 0
      ) {
        const restaurantData =
          searchResponse.data.data.restaurantSummaryDtoList[0];
        setMainImg(restaurantData.mainImg);
      }

      if (data.isLogin && accessToken) {
        const profileResponse = await axios.get(
          `http://localhost:8080/profiles`,
          {
            headers: { Authorization: `Bearer ${accessToken}` }, // 헤더에 토큰 포함
          }
        );
        setUserNickname(profileResponse.data.data.userNickname);
      }
    } catch (error) {
      console.error("Error fetching store data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, [storeId]);

  if (loading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (!storeData) {
    return <PageContainer>Store not found</PageContainer>;
  }

  const handleLoginRedirect = () => {
    alert("로그인이 필요합니다.");
    navigate("/login");
  };

  const handleBlurredClick = () => {
    if (!isLogin) {
      handleLoginRedirect();
    }
  };

  const handleLike = async () => {
    if (!isLogin) {
      handleLoginRedirect();
      return;
    }

    try {
      if (isLiked) {
        await axios.delete(
          `http://localhost:8080/restaurant/removeheart/${storeId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` }, // 헤더에 토큰 포함
          }
        );
        setIsLiked(false);
      } else {
        await axios.post(
          `http://localhost:8080/restaurant/addheart/${storeId}`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` }, // 헤더에 토큰 포함
          }
        );
        setIsLiked(true);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류가 발생했습니다.", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  const handleBookmark = async () => {
    if (!isLogin) {
      handleLoginRedirect();
      return;
    }

    try {
      if (isBookmarked) {
        await axios.delete(
          `http://localhost:8080/restaurant/removebookmark/${storeId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` }, // 헤더에 토큰 포함
          }
        );
        setIsBookmarked(false);
      } else {
        await axios.post(
          `http://localhost:8080/restaurant/addbookmark/${storeId}`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` }, // 헤더에 토큰 포함
          }
        );
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("즐겨찾기 처리 중 오류가 발생했습니다.", error);
      alert("즐겨찾기 처리 중 오류가 발생했습니다.");
    }
  };

  const handleReviewEdit = (review) => {
    if (!isLogin) {
      handleLoginRedirect();
      return;
    }
    setEditingReview({
      reviewId: review.reviewId,
      star: review.star,
      contents: review.contents,
      reviewImg:
        review.reviewImgList && review.reviewImgList.length > 0
          ? review.reviewImgList[0]
          : null,
    });
  };

  const handleReviewSubmit = async (updatedReviewData) => {
    try {
      await axios.post(
        `http://localhost:8080/restaurant/review/${editingReview.reviewId}`,
        updatedReviewData,
        { headers: { Authorization: `Bearer ${accessToken}` } } // 헤더에 토큰 포함
      );
      alert("리뷰가 성공적으로 수정되었습니다.");
      setEditingReview(null); // 수정 완료 후 초기화
      fetchStoreData(); // 수정 후 데이터를 다시 불러옴
    } catch (error) {
      console.error("리뷰 수정 중 오류가 발생했습니다.", error);
      alert("리뷰 수정 중 오류가 발생했습니다.");
    }
  };

  const handleReviewDelete = async (reviewId) => {
    if (!isLogin) {
      handleLoginRedirect();
      return;
    }
    try {
      await axios.delete(
        `http://localhost:8080/restaurant/review/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` }, // 헤더에 토큰 포함
        }
      );
      alert("리뷰가 성공적으로 삭제되었습니다.");
      fetchStoreData(); // 삭제 후 데이터를 다시 불러옴
    } catch (error) {
      console.error("리뷰 삭제 중 오류가 발생했습니다.", error);
      alert("리뷰 삭제 중 오류가 발생했습니다.");
    }
  };

  const {
    restaurantName,
    details,
    count_heart,
    count_bookmark,
    count_review,
    menuMap,
    address,
    phoneNumber,
    averageStar,
    reviewDetailsDtoList,
  } = storeData;

  const formatPhoneNumber = (phone) => {
    if (!phone) return "정보 없음";

    const cleaned = phone.toString().replace(/\D/g, "");

    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    } else if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(
        7
      )}`;
    } else if (cleaned.length === 12) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(
        8
      )}`;
    } else {
      return phone;
    }
  };

  // 리뷰를 최신순으로 정렬 및 자신이 작성한 리뷰를 가장 먼저 위치
  const sortedReviews = reviewDetailsDtoList
    ? [...reviewDetailsDtoList].sort((a, b) => {
        if (a.userNickname === userNickname) return -1; // 자신의 닉네임과 비교
        if (b.userNickname === userNickname) return 1;
        return new Date(b.timeLine) - new Date(a.timeLine);
      })
    : [];

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <ImageSection>
          <Image
            src={mainImg || "/path/to/default-image.png"}
            alt={restaurantName}
            style={{
              width: "600px",
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "2px solid #ddd",
            }}
          />
        </ImageSection>

        <StoreTitleSection>
          <div>
            <StoreTitle>{restaurantName}</StoreTitle>
            <Stars rating={averageStar} />
          </div>
          <RatingSection>
            <StatItem onClick={handleLike} style={{ cursor: "pointer" }}>
              {isLiked ? (
                <AiFillHeart style={{ color: "red", marginRight: "5px" }} />
              ) : (
                <AiOutlineHeart style={{ color: "grey", marginRight: "5px" }} />
              )}
              {count_heart}
            </StatItem>
            <StatItem onClick={handleBookmark} style={{ cursor: "pointer" }}>
              {isBookmarked ? (
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
          <InfoContent>{details || "매장 소개 정보가 없습니다."}</InfoContent>
        </InfoSection>

        <InfoBox>
          <InfoTitle>매장 정보</InfoTitle>
          <InfoContent>전화번호 : {formatPhoneNumber(phoneNumber)}</InfoContent>
          <InfoContent>
            주소 : 인천광역시 미추홀구 {address || "정보 없음"}
          </InfoContent>
        </InfoBox>

        <InfoSection>
          <InfoTitle>리뷰</InfoTitle>
          <ReviewSection>
            {isLogin ? (
              <>
                <ReviewForm
                  storeId={storeId}
                  onReviewSubmitted={fetchStoreData}
                  initialData={editingReview} // 수정 시 기존 데이터를 전달
                  onSubmit={handleReviewSubmit} // 리뷰 등록 또는 수정을 처리
                  onCancel={() => setEditingReview(null)} // 수정 취소 시 처리
                />
                <ReviewsGrid>
                  {sortedReviews && sortedReviews.length > 0 ? (
                    sortedReviews.map((review, index) => (
                      <ReviewCard
                        key={index}
                        review={review}
                        onEdit={() => handleReviewEdit(review)} // 수정 버튼 클릭 시 처리
                        onDelete={() => handleReviewDelete(review.reviewId)} // 삭제 버튼 클릭 시 처리
                        canEdit={
                          isLogin && review.userNickname === userNickname
                        } // 수정/삭제 가능 여부 확인
                      />
                    ))
                  ) : (
                    <div>리뷰가 없습니다.</div>
                  )}
                </ReviewsGrid>
              </>
            ) : (
              <BlurredSection onClick={handleBlurredClick}>
                <ReviewForm
                  storeId={storeId}
                  onReviewSubmitted={fetchStoreData}
                  initialData={editingReview} // 수정 시 기존 데이터를 전달
                  onSubmit={handleReviewSubmit} // 리뷰 등록 또는 수정을 처리
                  onCancel={() => setEditingReview(null)} // 수정 취소 시 처리
                />
                <ReviewsGrid>
                  {sortedReviews && sortedReviews.length > 0 ? (
                    sortedReviews.map((review, index) => (
                      <ReviewCard
                        key={index}
                        review={review}
                        onEdit={() => handleReviewEdit(review)} // 수정 버튼 클릭 시 처리
                        onDelete={() => handleReviewDelete(review.reviewId)} // 삭제 버튼 클릭 시 처리
                        canEdit={
                          isLogin && review.userNickname === userNickname
                        } // 수정/삭제 가능 여부 확인
                      />
                    ))
                  ) : (
                    <div>리뷰가 없습니다.</div>
                  )}
                </ReviewsGrid>
              </BlurredSection>
            )}
          </ReviewSection>
        </InfoSection>
      </PageContainer>
    </>
  );
};

export default FoodDetailPage;
