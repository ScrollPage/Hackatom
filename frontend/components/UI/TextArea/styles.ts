import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Inner = styled.textarea <{ isShowError?: boolean, min?: string, max?: string }> `
  border: 1px solid ${({ isShowError }) => isShowError ? 'red' : "rgba(0, 0, 0, 0.1)"};
  font-size: 18px;
  width: 100%;
  resize: vertical; 
  min-height: ${({ min }) => min ? min : "50px"};
  max-height: ${({ max }) => max ? max : "300px"};
  border-radius: 20px;
  outline: none;
  padding: 14px 23px;
  color: rgba(0, 0, 0, 0.7);
  background-color: #fff;
  ::placeholder {
    color: #000;
    font-size: 18px;
    font-family: Play;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.4);
  } 
`;

export const Error = styled.small`
  position: absolute;
  bottom: -20px;
  color: red;
`;