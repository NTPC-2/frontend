import ReviewCard from "../../component/ReviewCard";
import styled from "styled-components";
import { useState, useEffect } from "react";
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
const mockReviews = [
  {
    restaurantName: "가메이",
    star: 4,
    contents: "Great food and service!",
    timeLine: "2024-08-21",
    userNickname: "홍길동",
    imgList: [],
  },
  {
    restaurantName: "홍콩반점",
    star: 5,
    contents: "Excellent experience. Highly recommend!",
    timeLine: "2024-08-20",
    userNickname: "김철수",
    imgList: [],
  },
];

// eslint-disable-next-line react/prop-types
const Reviewpage = ({ count }) => {
  // 임의의 데이터로 상태 초기화
  const [reviews, setReviews] = useState(mockReviews);
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);

  useEffect(() => {
    // 주석 처리된 API 호출
    /*
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/profiles/review`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`, // AccessToken을 헤더에 포함시킵니다
            },
          }
        );
        setReviews(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReviews();
    */
  }, []);

  // 로딩 및 에러 상태는 주석 처리된 부분에서 사용되며, 현재는 임의의 데이터를 사용하므로 주석 처리
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <FoodContainer>
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </FoodContainer>
  );
};

export default Reviewpage;
