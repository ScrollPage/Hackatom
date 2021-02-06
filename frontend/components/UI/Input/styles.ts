import styled from 'styled-components';

export const Wrapper = styled.div<{ width?: string }>`
  position: relative;
  margin-bottom: 21px;
  width: ${({ width }) => width ? width : '300px'};
`;

export const Inner = styled.input <{ isShowError?: boolean }> `
  border: 1px solid ${({ isShowError }) => isShowError ? 'red' : "rgba(0, 0, 0, 0.1)"};
  padding: 14px 23px;
  background-color: #fff;
  width: 100%;
  color: #000;
  opacity: 1;
  border-radius: 10px;
  outline: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  ::placeholder {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    opacity: 0.5;
  }  
`;

export const Error = styled.small`
  font-family: "Play";
  position: absolute;
  bottom: -16px;
  left: 0;
  color: ${({ theme }) => theme.red};
`;


