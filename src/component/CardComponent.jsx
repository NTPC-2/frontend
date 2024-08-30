import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineStar,
  AiOutlineMessage,
  AiFillStar,
} from "react-icons/ai";

const Card = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  width: 300px;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.div`
  width: 120px;
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
  width: 100%;
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

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

const AverageStar = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555555;
`;

const CardStats = styled.div`
  display: flex;
  align-items: center;
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
    return null;
  }

  const {
    restaurantName,
    menuNames,
    mainImg,
    countHeart,
    countBookmark,
    countReview,
    averageStar,
    restaurantId,
  } = store;

  const firstMenu = menuNames.split(",")[0] || "메뉴 정보가 없습니다.";

  return (
    <Card>
      <CardImage>
        <img
          src={mainImg || "/path/to/default-image.png"}
          alt={restaurantName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      </CardImage>
      <CardContent>
        <StoreTitle
          to={{
            pathname: `/restaurant/${restaurantId}`,
            state: { store }, // store 정보를 전달
          }}
        >
          {restaurantName}
        </StoreTitle>
        <StoreMenu>{firstMenu}</StoreMenu>
        <CardFooter>
          <AverageStar>
            <AiFillStar style={{ color: "#FFD700", marginRight: "5px" }} />
            {averageStar ? averageStar.toFixed(1) : "0.0"}
          </AverageStar>
          <CardStats>
            <StoreStat>
              <AiOutlineHeart style={{ color: "grey" }} />
              {countHeart}
            </StoreStat>
            <StoreStat>
              <AiOutlineStar style={{ color: "grey" }} />
              {countBookmark}
            </StoreStat>
            <StoreStat>
              <AiOutlineMessage style={{ color: "grey" }} />
              {countReview}
            </StoreStat>
          </CardStats>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
