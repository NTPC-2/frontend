import { Wheel } from 'react-custom-roulette';
import { useState } from 'react';
import styled from 'styled-components';

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

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
`;

function App() {
  const [data, setData] = useState([]); // 초기 데이터 없음
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleSpinClick = () => {
    if (!mustSpin && data.length > 0) {
      const pivot = Math.floor((Math.random() * 99) + 1);
      let stack = 0;
      let newPrizeNumber = null;

      data.some((row, idx) => {
        stack += row.percentage;
        if (pivot <= stack) {
          newPrizeNumber = idx;
          return true;
        }
      });

      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const StopSpinning = () => {
    setMustSpin(false);
    if (data.length > 0) {
      alert(data[prizeNumber].option + '이 당첨되셨습니다');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addItem = () => {
    if (inputValue.trim() !== "") {
      const newItem = {
        option: inputValue.trim(),
        style: { backgroundColor: getRandomColor(), textColor: 'white' },
        percentage: 100 / (data.length + 1)
      };
      const newData = [...data, newItem].map(item => ({
        ...item,
        percentage: 100 / (data.length + 1)
      }));
      setData(newData);
      setInputValue("");
    }
  };

  const removeItem = (index) => {
    const newData = data.filter((_, i) => i !== index).map(item => ({
      ...item,
      percentage: 100 / (data.length - 1)
    }));
    setData(newData);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
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
          data={data.length > 0 ? data : [{ option: '', style: { backgroundColor: '#fff' }, percentage: 100 }]}
          onStopSpinning={StopSpinning}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
          outerBorderColor={"#ccc"}
          outerBorderWidth={10}
          innerBorderColor={"#f2f2f2"}
          innerBorderWidth={10}
          innerRadius={0} // 룰렛의 가운데를 채우기 위해 innerRadius를 0으로 설정
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
          value={inputValue}
          onChange={handleInputChange}
          placeholder="음식점 추가"
        />
        <Button onClick={addItem}>추가</Button>
        <List>
          {data.map((item, index) => (
            <ListItem key={index}>
              {item.option}
              <RemoveButton onClick={() => removeItem(index)}>삭제</RemoveButton>
            </ListItem>
          ))}
        </List>
      </MenuContainer>
    </Container>
  );
}

export default App;
