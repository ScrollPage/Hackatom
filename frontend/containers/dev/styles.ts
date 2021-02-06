import styled, { css } from 'styled-components';

export const Stage = styled.h2<{ isActive: boolean }>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 35px;
  text-align: center;
  text-align: left;
  cursor: pointer;
  ${({ isActive }) => !isActive && css`
    color: rgba(0, 0, 0, 0.3);
  `}
`
export const Stages = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 40px;
  margin-right: 40px;
  border-right: 1px solid #C4C4C4;
  width: 274px;
`
export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
export const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin: 0 0 35px 0;
`
export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 40px;
  margin-top: 30px;
`;
