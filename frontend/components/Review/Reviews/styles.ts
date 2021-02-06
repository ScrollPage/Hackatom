import styled from 'styled-components'

export const Title = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  margin: 0;
`
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`
export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  ${Title} {
    margin-right: 30px;
  }
`
export const Span = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;
  opacity: 0.5;
  cursor: pointer;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background: #FFFFFF;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 40px;
`;