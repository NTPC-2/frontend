import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export const ReviewFormContainer = styled.form`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 2px solid #ddd;
`;

export const ReviewTable = styled.table`
  width: 100%;
  margin-bottom: 10px;
`;

export const ReviewTableRow = styled.tr``;

export const ReviewTableCell = styled.td`
  padding: 8px;
  vertical-align: top;
`;

export const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 8px;
  border: 2px solid #ddd;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  resize: none;
`;

export const FileUploadButton = styled.div`
  margin-right: 10px;
  label {
    cursor: pointer;
    color: #777;
    background-color: #f0f0f0;
    padding: 8px 12px;
    border-radius: 4px;
  }
  input {
    display: none;
  }
`;

export const SubmitReviewButton = styled.button`
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

const ImageNameContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #888;
  margin-left: 8px;
`;

const RemoveImageButton = styled.button`
  margin-left: 8px;
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    color: darkred;
  }
`;

const ReviewForm = ({ storeId, initialData, onReviewSubmitted, onSubmit, onCancel }) => {
  const [reviewData, setReviewData] = useState({
    star: initialData ? initialData.star : 0,
    contents: initialData ? initialData.contents : "",
    reviewImg: null,
  });
  const [imageName, setImageName] = useState(initialData && initialData.reviewImg ? initialData.reviewImg : "");

  useEffect(() => {
    if (initialData) {
      setReviewData({
        star: initialData.star,
        contents: initialData.contents,
        reviewImg: null,
      });
      setImageName(initialData.reviewImg || "");
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const formattedValue =
      name === "star" ? Math.max(0, Math.min(5, parseFloat(value).toFixed(1))) : value;

    setReviewData({
      ...reviewData,
      [name]: formattedValue,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReviewData({
      ...reviewData,
      reviewImg: file,
    });
    setImageName(file.name);
  };

  const handleRemoveImage = () => {
    setReviewData({
      ...reviewData,
      reviewImg: null,
    });
    setImageName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reviewData.star < 0) {
      alert("유효한 별점을 입력해주세요.");
      return;
    }

    if (!reviewData.contents.trim()) {
      alert("작성 내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("star", reviewData.star);
    formData.append("contents", reviewData.contents);
    if (reviewData.reviewImg) {
      formData.append("reviewImg", reviewData.reviewImg);
    }

    try {
      if (initialData) {
        // 수정일 때는 onSubmit 함수를 사용
        onSubmit({
          star: reviewData.star,
          contents: reviewData.contents,
          reviewImg: imageName,  // 이미지가 업데이트되지 않았을 경우 기존 이미지 사용
        });
      } else {
        // 새 리뷰 작성일 때는 기존의 로직 사용
        await axios.post(
          `http://localhost:8080/restaurant/${storeId}/review`,
          formData
        );
        alert("리뷰가 성공적으로 등록되었습니다.");
        onReviewSubmitted(); // 부모 컴포넌트에 리뷰가 성공적으로 등록되었음을 알림
      }
    } catch (error) {
      console.error("리뷰 등록 중 오류가 발생했습니다.", error);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <ReviewFormContainer onSubmit={handleSubmit}>
      <ReviewTable>
        <tbody>
          <ReviewTableRow>
            <ReviewTableCell>별점:</ReviewTableCell>
            <ReviewTableCell>
              <input
                type="number"
                name="star"
                value={reviewData.star}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
                required
              />
            </ReviewTableCell>
          </ReviewTableRow>
          <ReviewTableRow>
            <ReviewTableCell>내용:</ReviewTableCell>
            <ReviewTableCell>
              <ReviewTextArea
                name="contents"
                value={reviewData.contents}
                onChange={handleInputChange}
                required
              />
            </ReviewTableCell>
          </ReviewTableRow>
        </tbody>
      </ReviewTable>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <FileUploadButton>
            <label>
              이미지 첨부
              <input type="file" onChange={handleFileChange} />
            </label>
          </FileUploadButton>
          {imageName && (
            <ImageNameContainer>
              {imageName}
              <RemoveImageButton type="button" onClick={handleRemoveImage}>
                삭제
              </RemoveImageButton>
            </ImageNameContainer>
          )}
        </div>
        <SubmitReviewButton type="submit">{initialData ? "리뷰 수정" : "리뷰 등록"}</SubmitReviewButton>
        {initialData && (
          <button type="button" onClick={onCancel}>
            취소
          </button>
        )}
      </div>
    </ReviewFormContainer>
  );
};

export default ReviewForm;
