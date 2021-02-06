import styled from "styled-components";
import { Wrapper as Input } from '@/components/UI/Input/styles';

export const Button = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  height: 30px;
  width: 30px;
  margin-left: 10px;
  > img {
    max-height: 100%;
    cursor: pointer;
  }
`;
export const Wrapper = styled.div`
  margin-right: 40px;
`;
export const Inner = styled.div`
  display: flex;
  align-items: center;
  ${Input} {
    margin-bottom: 0;
  }
`;