import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};

  padding: 18px;
  align-items: center;
  border-radius: 5px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

`;
