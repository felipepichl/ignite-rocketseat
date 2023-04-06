import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons'

interface TypeProps {
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)`
  
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) => type === 'up' && css`
    color: ${({ theme }) => theme.colors.success};;
  `};

  ${({ type }) => type === 'down' && css`
    color: ${({ theme }) => theme.colors.attention};;
  `};
`;

export const Title = styled.Text`
  
`;
