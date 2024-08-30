import ReviewCard from "../../component/ReviewCard";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
//import axios from "axios";

const FoodContainer = styled.div`
  height: 500px;
  width: 700px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: center;
  padding: 20px;
`;

//const ACCESS_TOKEN = process.env.REACT_APP_REFRESH_TOKEN;

// 임의의 데이터
// const mockReviews = [
//   {
//     restaurantName: "가메이",
//     star: 4,
//     contents: "Great food and service!",
//     timeLine: "2024-08-21",
//     userNickname: "홍길동",
//     imgList: [],
//   },
//   {
//     restaurantName: "홍콩반점",
//     star: 5,
//     contents: "Excellent experience. Highly recommend!",
//     timeLine: "2024-08-20",
//     userNickname: "김철수",
//     imgList: [],
//   },
// ];

// eslint-disable-next-line react/prop-types
const ReviewPage = ({ count }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://15.164.59.210:8080/profiles/review",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setReviews(response.data.data);
        } else {
          setError("Failed to fetch reviews");
        }
      } catch (error) {
        setError("Error fetching reviews: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <FoodContainer>
      {reviews.slice(0, count).map((review) => (
        <ReviewCard
          key={review.reviewId}
          restaurantName={review.restaurantName}
          star={review.star}
          contents={review.contents}
          userNickname={review.userNickname}
          timeLine={review.timeLine}
          imgList={review.imgList}
        />
      ))}
    </FoodContainer>
  );
};

export default ReviewPage;
