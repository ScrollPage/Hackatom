import styled from 'styled-components';
import { Wrapper as Button } from '@/components/UI/Button/styles';

export const Wrapper = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 20px 30px;
`;
export const Span = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;
  opacity: 0.5;
  cursor: pointer;
  text-align: center;
  display: block;
`
export const TopMain = styled.div`
  display: flex;
  align-items: center;
`;
export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;
export const Hide = styled.div``
export const Header = styled.div`
  margin: 0 0 0 20px;
`;
export const Title = styled.h1`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 34px;
  margin: 0;
`;
export const Main = styled.div`
  ${Button} {
    margin-bottom: 20px;
    &:last-of-type { 
      margin-bottom: 40px;
    }
  }
`;
export const Options = styled.div``;
export const Stroke = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
export const Option = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-size: 16px;
  line-height: 22px;
  display: inline-block;
`;
export const Change = styled.div`
  cursor: pointer;
`;
export const Label = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  flex: 0.4;
  > a {
    color: #000;
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;
export const Info = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  flex: 0.6;
`;
export const Roles = styled.div``;
export const SubTitle = styled.h3`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 20px;
`;
