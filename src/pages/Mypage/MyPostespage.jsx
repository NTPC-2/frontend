import CardComponent2 from "../../component/CardComponent2";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

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
const MyPostespage = ({ count }) => {
  const [posts, setPosts] = useState([]);

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
          console.error("api 호출 실패");
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
        <CardComponent2
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

export default MyPostespage;
