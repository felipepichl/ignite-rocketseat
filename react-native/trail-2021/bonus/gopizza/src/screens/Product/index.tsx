import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { ButtonBack } from '@src/components/ButtonBack'
import { Photo } from '@components/Photo'

import { 
  Container,
  Header,
  Title,
  DeleteLable,
  Upload,
  PickImageButton
} from './styles'

export function Product() {
  const [image, setImage] = useState('')
  
  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      })

      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    }
    
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack />

        <Title>Cadastrar</Title>
        
        <TouchableOpacity>
          <DeleteLable>Deletar</DeleteLable>
        </TouchableOpacity>
      </Header>

      <Upload>
        <Photo uri={image}/>
        
        <PickImageButton 
          title='Carregar'
          type='secondary'
          onPress={handlePickerImage}
        />
      </Upload>
    </Container>
  )
}