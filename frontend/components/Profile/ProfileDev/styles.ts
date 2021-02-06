import styled from 'styled-components';

export const Percent = styled.p`
  z-index: 2;
  position: absolute;
  left: 40px;
  bottom: 10px;
  margin: 0;
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 21px;
  color: #FFFFFF;
`
export const Title = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 34px;
`
export const Wrapper = styled.div<{ percent: number }>`
  background: #FFFFFF;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 20px 30px;
  height: 140px;
  margin-bottom: 45px;
  position: relative;
  &:before {
    z-index: 1;
    content: "";
    position: absolute;
    left: 0;
    width: ${({ percent }) => percent && percent}%;
    bottom: 0;
    height: 41px;
    background-color: #60CFBF;
    border-radius: ${({ percent }) => percent === 100 ? "0 0px 20px 20px" : "0 20px 20px 20px"};
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 41px;
    background-color: #E5E5E5;
    border-radius: 0 0 20px 20px;
  }
`;