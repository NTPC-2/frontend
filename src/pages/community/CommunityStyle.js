import styled from "styled-components";

// 각종 스타일 정의
export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleBar = styled.div`
  margin-top: 5%;
  width: 100%;
  height: 62px;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ContentContainer = styled.div`
  margin-top: 100px;
  display: flex;
  gap: 20px;
`;

export const LeftContentBox = styled.div`
  display: flex;
  width: 750px;
  height: 100%;
  flex-direction: column;
  gap: 80px;
`;

export const RightContentBox = styled.div`
  width: 460px;
  height: 980px;
  display: flex;
  flex-direction: column;
  background-color: #d9d9d9;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const WritePostBar = styled.div`
  width: 750px;
  height: 60px;
  background-color: #d9d9d9;
  display: flex;
  color: #000;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
`;

export const TitleBar2 = styled.div`
  width: 750px;
  height: 89px;
  border: 3px #000 solid;
  display: flex;
  color: #000;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
`;

export const PopularPostContent = styled.div`
  width: 399px;
  height: 149px;
  flex-shrink: 0;
  background-color: #fff;
`;

export const RecentReviews = styled.div`
  width: 399px;
  height: 149px;
  flex-shrink: 0;
  background-color: #fff;
`;

export const RanckingContent = styled.div`
  width: 399px;
  height: 370px;
  flex-shrink: 0;
  background-color: #fff;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 15px;

  &:hover {
    transform: scale(1.1);
  }
  margin-left: 500px;
`;

export const NextPageButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  width: 200px;
  font-size: 16px;

  cursor: pointer;
  background-color: #99ccff;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #66b2ff;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

export const PostDetailContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 10px 0;
  }
`;
