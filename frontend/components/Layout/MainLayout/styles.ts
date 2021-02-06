import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.blueBgc};
`;
export const Header = styled.div`
  z-index: 20;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.blueBgc};
`
export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Flex = styled.div`
  padding-top: 145px;
  display: flex;
  height: 100%;
`;

export const Hero = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled.p`
  margin: 0 0 0 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  > a {
    color: #000; 
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;

export const HeaderMain = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 40px;
`;

export const HeaderSide = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.div``;
export const Main = styled.div`
  flex: 1;
  padding-bottom: 40px;
  height: 100%;
`;

export const SideLink = styled.div<{ isActive: boolean }>`
  background-color: ${({ isActive, theme }) => isActive ? theme.lightBlue : 'transparent'};
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 20px;
  padding: 10px 23px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme && theme.lightBlue};
  }
  transition: background-color 0.3s ease;
  > a {
    color: #000;
  }
`;

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  padding-right: 60px;
`;
export const Notify = styled.button`
  outline: none;
  border: none;
  height: 41px;
  width: 41px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.lightBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  margin-right: 30px;
`;
