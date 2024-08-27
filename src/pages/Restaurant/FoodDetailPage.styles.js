import styled, { createGlobalStyle } from "styled-components";

// GlobalStyle 정의
export const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* x축 스크롤 제거 */
  }
`;

export const PageContainer = styled.div`
  padding: 20px;
  padding-top: 80px; /* 메뉴바에 가려지지 않도록 상단 패딩 추가 */
  background-color: #f5f5f5;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ImageSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  width: 600px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #ddd;
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const PrevButton = styled(NavButton)`
  left: 10px;
`;

export const NextButton = styled(NavButton)`
  right: 10px;
`;

export const StoreTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
`;

export const StoreTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  text-align: left;
`;

export const RatingSection = styled.div`
  display: flex;
  align-items: center;
`;

export const StatItem = styled.span`
  margin: 0 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const MapSection = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  height: 300px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777777;
  font-size: 18px;
  border: 2px solid #ddd;
  margin-right: 20px;
`;

export const InfoBox = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #ddd;
  margin-bottom: 20px; /* 메뉴 박스와 동일한 간격을 위해 추가 */
`;

export const InfoSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
`;

export const InfoTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const InfoContent = styled.p`
  font-size: 16px;
  color: #666666;
  margin: 0;
`;

export const ReviewSection = styled.div`
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #ddd;
`;

export const ReviewCard = styled.div`
  background-color: #e7f4ff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 2px solid #ddd;
`;

export const ReviewerName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px;
`;

export const ReviewText = styled.p`
  font-size: 14px;
  color: #555555;
  margin: 0;
`;

export const ReviewFooter = styled.div`
  text-align: right;
  padding: 10px;
  font-size: 14px;
  color: #555555;
  cursor: pointer;
`;
