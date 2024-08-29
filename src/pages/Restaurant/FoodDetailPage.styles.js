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
  border-radius: 8px;
  border: 2px solid #ddd;
`;

export const StoreTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px; /* 하단에 여유 공간을 주어 분리감 */
  border-bottom: 1px solid #ddd; /* 아래쪽에 구분선 추가 */
`;

export const StoreTitle = styled.h2`
  font-size: 32px; /* 타이틀 폰트 크기 증가 */
  font-weight: bold;
  margin: 0;
  text-align: left;
`;

export const RatingSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const StatItem = styled.div`
  margin-left: 20px;
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

export const SubmitReviewButton = styled.button`
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;



export const BlurredSection = styled.div`
  filter: blur(5px);
  pointer-events: auto; /* 클릭 이벤트를 허용 */
  user-select: none; /* 드래그 및 텍스트 선택 방지 */
`;
