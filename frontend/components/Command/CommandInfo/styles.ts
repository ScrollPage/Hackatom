import styled from 'styled-components';
import { Wrapper as Button } from '@/components/UI/Button/styles';

export const Wrapper = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 30px 20px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Main = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;
export const Bottom = styled.div`
  flex: 0;
  width: 100%;
`;
export const Title = styled.h1`
  font-family: Play;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 37px;
  text-align: center;
`;
export const SubTitle = styled.div`
  font-family: Play;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  > span {
    font-weight: 800;
  }
`;
export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`
export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${Button} {
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
`
export const Change = styled.div`
  cursor: pointer;
  height: 42px;
  display: flex;
  align-items: center;
`;
export const RequestBtn = styled.button`
  align-self: flex-start;
  border: none;
  outline: none;
  height: 41px;
  width: 41px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.lightBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;