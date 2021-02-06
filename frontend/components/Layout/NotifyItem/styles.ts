import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;  
  width: 100%;
`
export const Wrapper = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;
export const Hero = styled.div`
  display: flex;
  align-items: center;
`;
export const Time = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin: 0;
`
export const Title = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  margin: 0;
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
