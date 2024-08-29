import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CardComponent from './CardComponent';

const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

//음식점 리스트 받아오기
const RestaurantCard = () => {
  const { category_id } = useParams(); // URL에서 category_id를 받아옵니다.
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // 카테고리 ID에 따라 서버에서 음식점 데이터를 가져옴
    const fetchStores = async () => {
      try {
        const response = await fetch(`http://localhost:8080/restaurant/list?category=${category_id}`);

        if (!response.ok) {
          console.error('Failed to fetch stores:', response.statusText);
          return;
        }

        const data = await response.json();
        setStores(data.data.restaurantSummaryDtoList || []); // 서버에서 받아온 음식점 리스트
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    if (category_id >= 0 && category_id <= 7) {  // 카테고리 ID가 0에서 7 사이인지 확인
      fetchStores();
    } else {
      console.error('Invalid category_id');
    }
  }, [category_id]);

  return (
    <CardsGrid>
      {stores.length > 0 ? (
        stores.map((store) => (
          <CardComponent key={store.restaurantId} store={store} />
        ))
      ) : (
        <p>해당 카테고리에 음식점이 없습니다.</p>
      )}
    </CardsGrid>
  );
};

export default RestaurantCard;
