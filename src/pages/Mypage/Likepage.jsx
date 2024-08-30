import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../../component/CardComponent";
import styled from "styled-components";

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

const Likepage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchLikedRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://15.164.59.210:8080/profiles/heart",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setRestaurants(response.data.data);
        } else {
          console.error("Failed to fetch liked restaurants.");
        }
      } catch (error) {
        console.error("Error fetching liked restaurants:", error);
      }
    };

    fetchLikedRestaurants();
  }, []);

  return (
    <FoodContainer>
      {restaurants.map((restaurant) => (
        <CardComponent
          key={restaurant.restaurantId}
          restaurantName={restaurant.restaurantName}
          mainImg={restaurant.mainImg}
          countHeart={restaurant.countHeart}
          countBookmark={restaurant.countBookmark}
          countReview={restaurant.countReview}
          mainMenuList={restaurant.mainMenuList}
        />
      ))}
    </FoodContainer>
  );
};

export default Likepage;
