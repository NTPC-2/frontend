import styled from "styled-components";

const PosterContainer = styled.div`
  width: 750px;
  height: 167px;
  flex-shrink: 0;
  border: 2px #d9d9d9 solid;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: #000;

  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.2px;
`;
const Content = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  letter-spacing: 0.2px;
`;
const Box = styled.div`
  display: flex;
`;
const Text = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.2px;
`;

const Poster = () => {
  return (
    <PosterContainer>
      <Title>혼밥러인데</Title>
      <Content>같이먹을사람?</Content>
      <Box>
        <Text>방금|홍길동</Text>
      </Box>
    </PosterContainer>
  );
};

export default Poster;
