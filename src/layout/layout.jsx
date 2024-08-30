import styled from "styled-components";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Layout = () => {
  return (
    <Container>
      <Navbar />

      <Outlet />
    </Container>
  );
};

export default Layout;
