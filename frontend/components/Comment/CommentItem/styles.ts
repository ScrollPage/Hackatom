import styled from 'styled-components'

export const Content = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
`
export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`
export const Time = styled.small``
export const Wrapper = styled.div`
  position: relative;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
`;
export const Hero = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;
export const Name = styled.p`
  max-width: 100%;
  margin: 0 0 0 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #000;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;
export const Close = styled.div`
  z-index: 20;
  position: absolute;
  height: 25px;
  width: 25px;
  top: 10px;
  right: 10px;
  cursor: pointer;
  &:hover {
    &:after {
      transform: translateX(-50%) translateY(-50%) rotate(45deg) scale(1.4);
    }
    &:before {
      transform: translateX(-50%) translateY(-50%) rotate(-45deg) scale(1.4);
    }
  }
  &:after, &:before {
    content: '';
    position: absolute;
    height: 10px;
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