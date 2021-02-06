import styled from "styled-components";
import { Wrapper as Button } from '@/components/UI/Button/styles';

export const Wrapper = styled.div`
  background: #ffffff;
  height: 100%;
  > form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  ${Button} {
    align-self: flex-end;
    margin-bottom: 20px;
  }
`;

export const Small = styled.small`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin: 15px 20px; 
  white-space: pre-line;
`

export const FakeLink = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 10px;
  color: #0099FF;
  margin-left: 20px;
  flex: 1;
  cursor: pointer;
`

export const Text = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
`;

export const Inner = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin: 0 0 35px 0;
`