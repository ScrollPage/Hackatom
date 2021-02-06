import styled from 'styled-components'

export const Wrapper = styled.div<{ disabled: boolean }>`
  cursor: ${({ disabled }) => disabled ? "auto " : "pointer "}!important;
  display: flex;
  align-items: center;
`;
export const Title = styled.p`
  width: 10px;
  margin: 3px 0 0 14px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;