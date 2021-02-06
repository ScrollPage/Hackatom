import styled from 'styled-components';

export const Wrapper = styled.div<{ size?: number }>`
  height: ${({ size }) => size ? size : '40'}px;
  min-height: ${({ size }) => size ? size : '40'}px;
  width: ${({ size }) => size ? size : '40'}px;
  min-width: ${({ size }) => size ? size : '40'}px;
  background-color: ${({ theme }) => theme.blue};
  border-radius: 50%;
  margin: 0;
`;