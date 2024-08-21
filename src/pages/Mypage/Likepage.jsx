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

// eslint-disable-next-line react/prop-types
const Likepage = ({ count }) => {
  const cards = Array.from({ length: count }, (_, index) => (
    <CardComponent key={index} />
  ));

  return <FoodContainer>{cards}</FoodContainer>;
};

export default Likepage;
