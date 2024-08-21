import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Layout from "./layout/layout";
import Mainpage from "./pages/MainPage";
import LoginPage from "./pages/Login/Loginpage";
import Signup from "./pages/Signup";
import Roulettepage from "./pages/Roulette_page";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Communitypage from "./pages/Communitypage";
import Categories from "./pages/Categories_page";
import FoodDetailPage from "./pages/Food_details_page";
import Mypage from "./pages/Mypage/MypageMain";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Mainpage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Signup" element={<Signup />} />

            <Route path="/Roulette" element={<Roulettepage />} />
            <Route path="/Community" element={<Communitypage />} />
            <Route path="/categories/:category" element={<Categories />} />
            <Route path="/store/:storeId" element={<FoodDetailPage />} />
            <Route path="/mypage" element={<Mypage />} />
          </Route>
          <Route
            path="/Login/forgot-password"
            element={<ForgotPasswordPage />}
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
//<Route element ={<Layout/>}> 안에 포함된 Route들은 전부 navbar가 고정된 상태
