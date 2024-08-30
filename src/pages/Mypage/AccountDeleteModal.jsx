import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &.confirm {
    background-color: red;
    color: white;
  }

  &.cancel {
    background-color: gray;
    color: white;
  }
`;

const AccountDeleteModal = ({ onClose }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.patch(
        "http://43.201.247.254:8080/profiles/delete",
        { status: "INACTIVE" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("회원 탈퇴가 성공적으로 완료되었습니다.");
        navigate("/");
      } else {
        alert("회원 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("회원 탈퇴에 실패했습니다.");
    } finally {
      onClose(); // 모달 닫기
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>회원탈퇴</h2>
        <p>정말로 회원 탈퇴를 하시겠습니까?</p>
        <ModalButton className="confirm" onClick={handleConfirmDelete}>
          예
        </ModalButton>
        <ModalButton className="cancel" onClick={onClose}>
          아니오
        </ModalButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AccountDeleteModal;
