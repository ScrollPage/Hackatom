import styled, { css } from 'styled-components';

export const Title = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  cursor: pointer;
`
export const HeaderItem = styled.div<{ isActive: boolean }>`
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px 20px 0 0;
  ${({ isActive }) => !isActive && css`
    background: transparent !important;
    box-shadow: none !important;
    border-radius: none !important;
  `}
  ${Title} {
    color: ${({ isActive }) => isActive ? '#000' : "rgba(0, 0, 0, 0.2)"};
  }
`

export const Header = styled.div`
  display: flex;
  margin-left: 40px;
`
export const Main = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  padding: 20px 30px;
  height: 172px;
`
export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;
`;