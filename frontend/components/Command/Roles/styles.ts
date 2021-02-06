import styled from 'styled-components';

export const Stroke = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
`;
export const Wrapper = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 30px 20px;
  ${Stroke} {
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
`;
export const Label = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  flex: 0.4;
`;
export const Info = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  flex: 0.6;
  > a {
    color: #000;
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;
export const Title = styled.h3`
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 20px;
`;