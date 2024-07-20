import styled from "styled-components";
import Navber from "./navbar";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Layout = () => {
  return (
    <Container>
      <Navber />
      <Outlet />
    </Container>
  );
};

export default Layout;
