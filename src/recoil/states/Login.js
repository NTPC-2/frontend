import { atom } from "recoil";

// export const LoggedState = atom({
//   key: "LoggedState", // 각 atom은 고유한 key를 가져야 합니다.
//   default: {
//     isLoggedIn: false,
//     user: null,
//   },
// });

export const LoggedState = atom({
  key: "LoggedState", // 각 atom은 고유한 key를 가져야 합니다.
  default: {
    isLoggedIn: false,
    userId: 1,
  },
});
