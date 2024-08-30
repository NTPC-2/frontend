import { useState, useEffect } from "react";
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

// eslint-disable-next-line react/prop-types
const MyCommentspage = ({ count }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://43.201.247.254:8080/profiles/scrap",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setPosts(response.data.data);
        } else {
          console.error("API 호출 실패");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <FoodContainer>
      {posts.slice(0, count).map((post) => (
        <CardComponent
          key={post.postId}
          postId={post.postId}
          topic={post.topic}
          contents={post.contents}
          countLike={post.countLike}
          countComment={post.countComment}
          timeLine={post.timeLine}
          userNickname={post.userNickname}
        />
      ))}
    </FoodContainer>
  );
};

export default MyCommentspage;
