import styled from "styled-components";
import { AiOutlineHeart, AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
// Styled components for RestaurantCard
const RestaurantCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
`;

const RestaurantName = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const RestaurantInfo = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

const RestaurantFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
  color: #555;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 10px;]
`;

// Component definition
export const RestaurantCard = ({ restaurant }) => {
  return (
    <RestaurantCardWrapper to={`restarant/details/${restaurant.restaurandId}`}>
      <RestaurantName>{restaurant.restaurantName}</RestaurantName>
      <RestaurantFooter>
        <IconWrapper>
          <AiOutlineHeart size={16} style={{ marginRight: "5px" }} />
          {restaurant.countHeart}
        </IconWrapper>
        <IconWrapper>
          <AiOutlineStar size={16} style={{ marginRight: "5px" }} />
          {restaurant.countBookmark}
        </IconWrapper>
        <IconWrapper>
          {[...Array(5)].map((_, index) =>
            index < Math.round(restaurant.averageStar) ? (
              <AiFillStar
                key={index}
                size={16}
                style={{ color: "gold", marginRight: "2px" }}
              />
            ) : (
              <AiOutlineStar
                key={index}
                size={16}
                style={{ marginRight: "2px" }}
              />
            )
          )}
        </IconWrapper>
        <span>
          {restaurant.averageStar} / 5 ({restaurant.countReview} Reviews)
        </span>
      </RestaurantFooter>
    </RestaurantCardWrapper>
  );
};
