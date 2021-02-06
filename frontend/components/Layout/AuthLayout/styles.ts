import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;
export const Header = styled.div`
  padding: 44px 63px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;
export const Main = styled.div`
  z-index: 10;
`
export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -5;
  > img {
    width: 100%;
  }
`;
