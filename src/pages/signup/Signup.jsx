const handleSignup = async () => {
  if (!isFormValid()) {
    alert("입력된 정보를 확인해주세요.");
    return;
  }

  const formData = new FormData();
  formData.append("email", inputValue.email);
  formData.append("password", inputValue.password);
  formData.append("nickname", inputValue.nickname);
  formData.append("phoneNumber", inputValue.phone);
  formData.append("gender", inputValue.gender);
  formData.append("age", inputValue.age);

  if (inputValue.profileImg) {
    formData.append("profileImg", inputValue.profileImg);
  } else {
    // 기본 이미지 URL을 프로필 이미지로 설정
    const defaultImgUrl = "http://localhost:3000/기본.jpeg";

    try {
      const response = await fetch(defaultImgUrl);
      const blob = await response.blob();
      const defaultImg = new File([blob], "기본.jpeg", { type: "image/jpeg" });
      formData.append("profileImg", defaultImg);
    } catch (error) {
      console.error("기본 이미지 로드 실패:", error);
      return;
    }
  }

  try {
    const response = await axios.post(
      `http://localhost:8080/signup`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      alert("회원가입 성공! 로그인해주세요!");

      // 로그인 상태 업데이트
      setLoggedState({
        isLoggedIn: true,
        nickname: inputValue.nickname,
        email: inputValue.email,
        phone: inputValue.phone,
        gender: inputValue.gender,
        age: inputValue.age,
        profileImg: inputValue.profileImg || defaultImgUrl,
      });

      navigate("/");
    }
  } catch (error) {
    if (error.response) {
      const { status } = error.response;

      if (status === 3010) {
        setErrorMessage({
          ...errorMessage,
          email: "이미 존재하는 이메일입니다.",
        });
        setInputValue({ ...inputValue, email: "" });
      } else if (status === 3011) {
        setErrorMessage({
          ...errorMessage,
          nickname: "이미 존재하는 닉네임입니다.",
        });
        setInputValue({ ...inputValue, nickname: "" });
      } else {
        console.log("오류 발생:", error.response.data);
      }
    } else {
      console.log("네트워크 오류 또는 서버 오류:", error);
    }
  }
};

return (
  <>
    <GlobalStyle />
    <S.StyleTitle>회원가입</S.StyleTitle>
    <S.Container>
      <S.FormContainer>
        <S.InputRow>
          <div>
            <S.StyleText>닉네임</S.StyleText>
            <S.StyleInput
              type="text"
              placeholder="닉네임 입력"
              name="nickname"
              value={inputValue.nickname}
              onChange={handleInputChange}
            />
            {errors.nickname && <S.ErrorText>{errors.nickname}</S.ErrorText>}
          </div>

          <div>
            <S.StyleText>전화번호</S.StyleText>
            <S.StyleInput
              type="tel"
              placeholder="전화번호 입력"
              name="phone"
              value={inputValue.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <S.ErrorText>{errors.phone}</S.ErrorText>}
          </div>
        </S.InputRow>

        <S.InputRow>
          <div>
            <S.StyleText>이메일</S.StyleText>
            <S.StyleInput
              type="email"
              placeholder="이메일 입력"
              name="email"
              value={inputValue.email}
              onChange={handleInputChange}
            />
            {errors.email && <S.ErrorText>{errors.email}</S.ErrorText>}
          </div>

          <div>
            <S.StyleText>비밀번호</S.StyleText>
            <S.StyleInput
              type="password"
              placeholder="비밀번호 입력"
              name="password"
              value={inputValue.password}
              onChange={handleInputChange}
            />
            {errors.password && <S.ErrorText>{errors.password}</S.ErrorText>}
          </div>
        </S.InputRow>

        <S.InputRow>
          <div>
            <S.StyleText>비밀번호 확인</S.StyleText>
            <S.StyleInput
              type="password"
              placeholder="비밀번호 확인"
              name="confirmPassword"
              value={inputValue.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <S.ErrorText>{errors.confirmPassword}</S.ErrorText>
            )}
          </div>

          <div>
            <S.StyleText>나이</S.StyleText>
            <S.StyleInput
              type="number"
              placeholder="나이 입력"
              name="age"
              value={inputValue.age}
              onChange={handleInputChange}
            />
            {errors.age && <S.ErrorText>{errors.age}</S.ErrorText>}
          </div>
        </S.InputRow>

        <div>
          <S.StyleText>성별</S.StyleText>
          <S.GenderContainer>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="M"
                onChange={handleInputChange}
              />
              <S.GenderLabel htmlFor="male">남성</S.GenderLabel>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="W"
                onChange={handleInputChange}
              />
              <S.GenderLabel htmlFor="female">여성</S.GenderLabel>
            </div>
          </S.GenderContainer>
          {errors.gender && <S.ErrorText>{errors.gender}</S.ErrorText>}
        </div>

        <div>
          <S.StyleText>프로필 이미지 (선택)</S.StyleText>
          <S.StyleInput
            type="file"
            name="profileImg"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>

        <S.SubmitButton onClick={handleSignup} disabled={!isFormValid()}>
          회원가입
        </S.SubmitButton>
      </S.FormContainer>
    </S.Container>
  </>
);
