import styled, { css } from 'styled-components'

export const Main = styled.div`
  display: flex;
  flex-direction: column;
`
export const DocName = styled.div`
`

export const DocWrapper = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  margin-left: 12px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > a {
    > img {
      max-width: 40px;
    }
  }
`

export const Header = styled.div`
  display: flex;
`
export const Time = styled.span`
  opacity: 0.5;
  font-size: 12px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
`
export const Title = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 800;
  font-size: 17px;
  line-height: 15px;
  margin: 0 10px 10px 0;
`
export const Text = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  margin: 0;
  word-break: break-all;
`
export const Wrapper = styled.div<{ isMy: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 19px 25px;
  max-width: 90%;
  border: 1px solid ${({ theme }) => theme.lightBlue};
  border-radius: 10px;
  ${({ isMy }) => isMy && css`
    float: right;
    background-color: ${({ theme }) => theme.lightBlue};
  ` }
`;
