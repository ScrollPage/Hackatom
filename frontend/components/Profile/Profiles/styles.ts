import styled from 'styled-components';
import { Wrapper as ProfileItem } from '../ProfileItem/styles';

export const Wrapper = styled.div`
  ${ProfileItem} {
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;