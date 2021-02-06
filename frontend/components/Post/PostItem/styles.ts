import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 20px 30px;
  margin-bottom: 24px;
  position: relative;
`;
export const Bottom = styled.div`
  display: flex;
  margin-top: 15px;
`
export const Title = styled.div`
  margin-left: 16px;
`
export const Time = styled.small`
  opacity: 0.5;
  font-size: 12px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
`
export const Inner = styled.div`
  > img {
    width: 100%;
  }
`
export const Text = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 20px;
  > span {
    cursor: pointer;
    margin-left: 10px;
    opacity: 0.5;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
  }
`

export const Hero = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
`;

export const Name = styled.p`
  margin: 0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  > a {
    color: #000;
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;
export const Close = styled.div`
    position: absolute;
    height: 18px;
    width: 18px;
    top: 20px;
    right: 30px;
    cursor: pointer;
    &:after, &:before {
      content: '';
      position: absolute;
      height: 18px;
      width: 1.5px;
      background-color: #000;
      top: 50%;
      left: 50%;
    }
    &:after {
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
    }
    &:before {
        transform: translateX(-50%) translateY(-50%) rotate(-45deg);
    }
`
export const LastComment = styled.div`
  border-top: 1px solid #C4C4C4;
  padding-top: 20px;
  margin-top: 20px;
`;