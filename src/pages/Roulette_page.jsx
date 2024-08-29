import { Wheel } from "react-custom-roulette";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // axios를 import

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  padding-top: 10%;
`;

const RouletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  background: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: #5b86e5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.add ? "#5b86e5" : "red")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 14px;
  width: 70px; /* 추가와 삭제 버튼의 크기를 동일하게 맞춤 */
`;

function Roulette() {
  const [data, setData] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchFavoriteRestaurants();
  }, []);

  const fetchFavoriteRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:8080/roulette');
      const restaurantData = response.data.map((restaurant) => ({
        option: restaurant.restaurantName,
        restaurantId: restaurant.restaurantId,
        style: { backgroundColor: getRandomColor(), textColor: "white" },
      }));

      setData(restaurantData);
    } catch (error) {
      console.error("Error fetching favorite restaurants:", error);
      alert("즐겨찾기 음식점을 가져오는 중 오류가 발생했습니다.");
    }
  };

  const handleSpinClick = () => {
    if (data.length === 0) {
      alert("데이터가 없습니다. 먼저 항목을 추가하세요.");
      return;
    }

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const StopSpinning = () => {
    setMustSpin(false);
    if (data.length > 0) {
      const selectedRestaurant = data[prizeNumber];
      alert(`${selectedRestaurant.option}이 당첨되셨습니다!`);

      const navigateToDetail = window.confirm(
        `${selectedRestaurant.option}의 자세히 보기 페이지로 이동하시겠습니까?`
      );
      if (navigateToDetail) {
        window.location.href = `/restaurant/${selectedRestaurant.restaurantId}`;
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/restaurant/search/list?search=${searchQuery}`
      );
      setSearchResults(response.data.data.restaurantSummaryDtoList || []);
    } catch (error) {
      console.error("Error searching for restaurants:", error);
      alert("음식점 검색 중 오류가 발생했습니다.");
    }
  };

  const addItem = (restaurant) => {
    const newItem = {
      option: restaurant.restaurantName,
      restaurantId: restaurant.restaurantId,
      style: { backgroundColor: getRandomColor(), textColor: "white" },
    };
    setData([...data, newItem]);
    setSearchQuery("");
    setSearchResults([]);
  };

  const removeItem = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Container>
      <RouletteContainer>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data.length > 0 ? data : [{ option: "No data", style: { backgroundColor: "#fff" } }]}
          onStopSpinning={StopSpinning}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
          outerBorderColor={"#ccc"}
          outerBorderWidth={10}
          innerBorderColor={"#f2f2f2"}
          innerBorderWidth={10}
          innerRadius={0}
          radiusLineColor={"#eeeeee"}
          radiusLineWidth={8}
          fontSize={17}
          perpendicularText={true}
        />
        <Button onClick={handleSpinClick}>SPIN</Button>
      </RouletteContainer>
      <MenuContainer>
        <Title>나의 즐겨찾기 음식점</Title>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="음식점 검색"
        />
        <Button onClick={handleSearch}>검색</Button>
        <List>
          {searchResults.map((restaurant, index) => (
            <ListItem key={index}>
              {restaurant.restaurantName}
              <ActionButton add onClick={() => addItem(restaurant)}>추가</ActionButton>
            </ListItem>
          ))}
          {data.map((item, index) => (
            <ListItem key={index}>
              {item.option}
              <ActionButton onClick={() => removeItem(index)}>삭제</ActionButton>
            </ListItem>
          ))}
        </List>
      </MenuContainer>
    </Container>
  );
}

export default Roulette;
