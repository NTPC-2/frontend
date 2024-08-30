import { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccountDeleteModal from "./AccountDeleteModal";
import { useRecoilState } from "recoil";
import { LoggedState } from "../../recoil/states/Login";

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
  const [loggedState, setLoggedState] = useRecoilState(LoggedState);
  const [profileImage, setProfileImage] = useState(
    loggedState.profileImg || ""
  );
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [nickname, setNickname] = useState(loggedState.nickname || "");
  const [email, setEmail] = useState(loggedState.email || "");
  const [phoneNumber, setPhoneNumber] = useState(loggedState.phone || "");
  const [gender, setGender] = useState(loggedState.gender || "");
  const [age, setAge] = useState(loggedState.age || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "http://43.201.247.254:8080/profiles/update",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
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
  }, [token]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("nickname", nickname); // Ensure this is the correct variable name
      formData.append("phoneNumber", phoneNumber);
      formData.append("gender", gender);
      formData.append("age", age);

      if (profileImageFile) {
        formData.append("profileImg", profileImageFile);
      } else if (profileImage) {
        const response = await fetch(profileImage);
        const blob = await response.blob();
        const file = new File([blob], "profileImage.jpg", { type: blob.type });
        formData.append("profileImg", file);
      }

      await axios.put("http://43.201.247.254:8080/profiles/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      // PUT 요청 성공 후 GET 요청을 통해 최신 정보 불러오기
      const updatedProfileResponse = await axios.get(
        "http://43.201.247.254:8080/profiles/update",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const { email, nickname, phoneNumber, gender, age, profileImg } =
        updatedProfileResponse.data.data;

      setLoggedState((prevState) => ({
        ...prevState,
        email,
        nickname, // Make sure to use correct variable name
        phoneNumber,
        gender,
        age,
        profileImg,
      }));

      window.alert("정보가 올바르게 수정되었습니다!");
      navigate("/mypage");
    } catch (error) {
      console.error("Error updating profile:", error);
      window.alert("프로필 수정에 실패했습니다.");
    }
  };

  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDeleteAccount = async () => {
    try {
      await axios.patch(
        "http://43.201.247.254:8080/profiles/delete",
        { status: "INACTIVE" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      window.alert("회원 탈퇴가 성공적으로 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      window.alert("회원 탈퇴에 실패했습니다.");
    } finally {
      closeModal();
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

      {isModalOpen && (
        <AccountDeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDeleteAccount}
        />
      )}
    </Container>
  );
};

export default ProfileEditPage;
