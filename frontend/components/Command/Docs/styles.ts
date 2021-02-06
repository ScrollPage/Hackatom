import styled from 'styled-components';
import { Wrapper as EmptyMessage } from '@/components/UI/EmptyMessage/styles';

export const Wrapper = styled.div`
  ${EmptyMessage} {
    display: inline-block;
    margin-right: 20px;
  }
`;
export const AddDoc = styled.button`
  outline: none;
  background-color: #fff;
  display: inline-block;
  padding: 10px 20px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme && theme.blue};
  border-radius: 10px;  
  font-family: Montserrat;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  position: relative;
  &:after, &:before {
    content: '';
    position: absolute;
    height: 17px;
    width: 4px;
    background-color: #000;
    top: 50%;
    left: 50%;
    border-radius: 1px;
  }
  &:after {
    transform: translateX(-50%) translateY(-50%);
  }
  &:before {
    transform: translateX(-50%) translateY(-50%) rotate(90deg);
  }
`;

export const Doc = styled.div`
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme && theme.blue};
  border-radius: 10px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  > a {
    color: #000;
    &:hover {
      color: ${({ theme }) => theme && theme.blue};
    }
  }
  > img {
    height: 16px;
    width: 16px;
    margin-left: 20px;
  }
`;