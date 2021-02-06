import styled from 'styled-components';
import { Wrapper as Button } from '@/components/UI/Button/styles';

export const Wrapper = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
export const Main = styled.div`
  margin-bottom: 27px;
  display: flex;
  align-items: center;
`;
export const Bottom = styled.div`
  display: flex;
  ${Button} {
    margin-right: 32px;
  }
`;
export const Hero = styled.div`
  display: flex;
  align-items: center;
`;
export const Title = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin: 0;
  height: 14px;
  margin-left: 32px;
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
  }
`;
