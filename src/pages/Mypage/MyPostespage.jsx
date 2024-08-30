import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardComponent2 from "../../component/CardComponent2";

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

const MyPostespage = ({ count }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/profiles/post",
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

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`); // Navigate to the detailed view
  };

  return (
    <FoodContainer>
      {posts.slice(0, count).map((post) => (
        <CardComponent2
          key={post.postId}
          postId={post.postId}
          topic={post.topic}
          contents={post.contents}
          countLike={post.countLike}
          countComment={post.countComment}
          timeLine={post.timeLine}
          userNickname={post.userNickname}
          onPostClick={() => handlePostClick(post.postId)} // Pass handler
        />
      ))}
    </FoodContainer>
  );
};

export default MyPostespage;
