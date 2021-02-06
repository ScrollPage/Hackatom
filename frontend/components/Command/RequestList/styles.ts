import styled from 'styled-components';
import { Wrapper as RequestItem } from '../RequestItem/styles';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 720px;
  margin-right: 41px;
  background: #EBF7FF;
  border-radius: 20px 0 0 20px;
  padding: 20px 30px;
  z-index: 40;
  max-height: 425px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    height: 90%;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0099FF;
  }
  ${RequestItem} {
    &:last-of-type {
      border-bottom: none;
    }
    &:first-of-type {
      padding-top: 0;
    }
  }
`;