import styled from 'styled-components'
import { Wrapper as Input } from '@/components/UI/Input/styles';

export const Wrapper = styled.div`
  ${Input} {
    margin-bottom: 0;
  }
`;
export const Inner = styled.div`
  display: flex;
  align-items: center;
`;
export const Button = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  margin-left: 10px;
  margin-right: 10px;
  > img {
    max-height: 100%;
    cursor: pointer;
  }
`;