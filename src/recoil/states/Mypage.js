import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    userNickname: "",
    countMyBookmark: 0,
    countMyReview: 0,
    countMyHeart: 0,
    countMyPost: 0,
    countMyScrap: 0,
  },
});

// export const userState = atom({
//   key: "userState",
//   default: {
//     userNickname: "김철수", // 임시 사용자 닉네임
//     countMyBookmark: 5, // 임시 즐겨찾기 개수
//     countMyReview: 3, // 임시 리뷰 개수
//     countMyHeart: 7, // 임시 좋아요 개수
//     countMyPost: 10, // 임시 작성한 글 개수
//     countMyScrap: 2, // 임시 스크랩 개수
//   },
// });
