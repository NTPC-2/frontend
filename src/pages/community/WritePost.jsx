import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// 스타일 정의
const WritePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  size: 20px;
  &::placeholder {
    font-size: 16px; /* 원하는 글자 크기 설정 */
    color: #999; /* placeholder의 색상 설정 (선택 사항) */
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  &::placeholder {
    font-size: 16px; /* 원하는 글자 크기 설정 */
    color: #999; /* placeholder의 색상 설정 (선택 사항) */
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 100px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const WritePost = ({ onClose, onPostCreated }) => {
  const [formData, setFormData] = useState({
    topic: "",
    contents: "",
    imgUrl: null,
  });

  const accessToken = localStorage.getItem("accessToken");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgUrl") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("topic", formData.topic);
    data.append("contents", formData.contents);
    if (formData.imgUrl) {
      data.append("imgUrl", formData.imgUrl); // 이미지 파일 추가
    }

    try {
      const response = await axios.post(
        `http://43.201.247.254:8080/post`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        alert("게시물이 작성되었습니다.");
        onClose(); // 글쓰기 컴포넌트를 닫음
        onPostCreated(); // 부모 컴포넌트에 글 작성 완료를 알림
      } else {
        alert("게시물 작성 실패");
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("게시물 작성 중 에러 발생: ", error);
    }
  };

  return (
    <WritePostContainer>
      <Input
        type="text"
        name="topic"
        placeholder="제목"
        value={formData.topic}
        onChange={handleInputChange}
      />
      <Textarea
        name="contents"
        placeholder="내용"
        value={formData.contents}
        onChange={handleInputChange}
      />
      <Input
        type="file"
        name="imgUrl"
        accept="image/*"
        onChange={handleInputChange}
      />
      <ButtonBox>
        <Button onClick={handleSubmit}>작성 완료</Button>
        <Button onClick={onClose}>취소</Button>
      </ButtonBox>
    </WritePostContainer>
  );
};

export default WritePost;
