import { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  input {
    display: none;
  }

  label {
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    width: 100%;
    text-align: center;
    padding: 5px 0;
    cursor: pointer;
  }
`;

const InputField = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }

  textarea {
    resize: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 48%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &.save {
    background-color: #5b86e5;
    color: white;
  }

  &.cancel {
    background-color: #ccc;
    color: white;
  }

  &.delete {
    background-color: #e55b5b;
    color: white;
    margin-top: 20px;
    width: 100%;
  }
`;

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const token = localStorage.getItem("authToken"); // Get token from localStorage

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/profiles/update",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
            withCredentials: true, // 쿠키 포함
          }
        );

        const { email, nickname, phoneNumber, gender, age, profileImg } =
          response.data.data;
        setEmail(email);
        setNickname(nickname);
        setPhoneNumber(phoneNumber);
        setGender(gender);
        setAge(age);
        setProfileImage(profileImg);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [token]); // Added token dependency

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("profileImg", profileImage);
      formData.append("nickname", nickname);
      formData.append("phoneNumber", phoneNumber);
      formData.append("gender", gender);
      formData.append("age", age);

      await axios.put("http://localhost:8080/profiles/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
        withCredentials: true, // 쿠키 포함
      });

      window.alert("정보가 올바르게 수정되었습니다!");
      navigate("/mypage");
    } catch (error) {
      console.error("Error updating profile:", error);
      window.alert("프로필 수정에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    window.alert("변경사항이 저장되지 않았습니다.");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("정말로 회원 탈퇴를 하시겠습니까?");
    if (confirmDelete) {
      try {
        await axios.patch(
          "http://localhost:8080/profiles/delete",
          { status: "INACTIVE" }, // 요청 본문에 상태 변경 정보 포함
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
            withCredentials: true, // 쿠키 포함
          }
        );
        window.alert("회원 탈퇴가 성공적으로 완료되었습니다.");
        navigate("/");
      } catch (error) {
        console.error("Error deleting account:", error);
        window.alert("회원 탈퇴에 실패했습니다.");
      }
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <Title>내 프로필</Title>
      <ProfileImage>
        {profileImage ? (
          <img src={profileImage} alt="Profile" />
        ) : (
          <span>Upload Image</span>
        )}
        <label htmlFor="profileImage">Change</label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleImageChange}
        />
      </ProfileImage>

      <InputField>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter your nickname"
        />
      </InputField>

      <InputField>
        <label htmlFor="phoneNumber">전화번호</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
      </InputField>

      <InputField>
        <label htmlFor="gender">성별</label>
        <input
          type="text"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Enter your gender"
        />
      </InputField>

      <InputField>
        <label htmlFor="age">나이</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
        />
      </InputField>

      <ButtonContainer>
        <Button className="save" onClick={handleSave}>
          Save
        </Button>
        <Button className="cancel" onClick={handleCancel}>
          Cancel
        </Button>
      </ButtonContainer>

      <Button className="delete" onClick={handleDeleteAccount}>
        회원탈퇴
      </Button>
    </Container>
  );
};

export default ProfileEditPage;
