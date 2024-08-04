import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Mainpage from "./pages/MainPage";
import LoginPage from "./pages/Loginpage";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Mainpage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
//<Route element ={<Layout/>}> 안에 포함된 Route들은 전부 navbar가 고정된 상태
