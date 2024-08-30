import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CardComponent from "../../component/CardComponent";

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

const Bookmarkpage = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get(
          "http://43.201.247.254:8080/profiles/bookmark",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.success) {
          setBookmarks(response.data.data);
        } else {
          console.error("Failed to fetch bookmarks:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <FoodContainer>
      {bookmarks.map((bookmark) => (
        <CardComponent
          key={bookmark.restaurantId}
          storeId={bookmark.restaurantId}
          storeName={bookmark.restaurantName}
          storeLocation={bookmark.mainLocation}
          mainImg={bookmark.mainImg}
          heartCount={bookmark.countHeart}
          bookmarkCount={bookmark.countBookmark}
          mainMenu={bookmark.mainMenuList.join(", ")}
        />
      ))}
    </FoodContainer>
  );
};

export default Bookmarkpage;
