import styled, { css } from 'styled-components';

export const Wrapper = styled.button<{ myType: "outline" | "blue", width?: string }>`
  outline: none;
  cursor: pointer;
  user-select: none;
  pointer-events: auto;
  width: ${({ width }) => width ? width : "100%"};
  height: 42px;
  transition: all 0.3s ease;
  position: relative;
  padding: 0 10px;
  border-radius: 10px;

  ${({ myType, theme }) => myType === 'blue' && css`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #fff;
    background-color: ${theme.blue};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${theme.blue};
    &:hover {
      color: #000; 
      background-color: #fff;
    }
    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 10px;
        background: rgba(0,0,0,.2);
        z-index: 2;
      }
    }
  `};

  ${({ myType, theme }) => myType === 'outline' && css`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #000;
    background-color: #fff;
    border: 1px solid ${theme.blue};
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      color: #fff; 
      background-color: ${theme.blue};
    }
    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
      background-color: #C5C5C5;
      border: 1px solid #C5C5C5;
      color: #fff; 
    }

  `};
`;



