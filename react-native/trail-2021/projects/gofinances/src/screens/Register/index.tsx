import React, { useState } from 'react';
import { 
  Modal,
  Keyboard,
  Alert
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../../screens/CategorySelect';

import { 
  Container,
  Header,
  Title, 
  Form,
  Fields, 
  TransactionsTypes
} from './styles';


interface FormData {
  [name: string]: string;
}

type NavigationProps = {
  navigate:(screen:string) => void;
}

const schema = Yup.object({
  name: Yup.string().required('Informe um nome'),
  amount: Yup
  .number()
  .typeError('Informe um número')
  .positive('O valor não pode ser negativo')
  .required('Informe um valor')
}).required();

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { user } = useAuth();

  const { navigate } = useNavigation<NavigationProps>();
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  
  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }
  
  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo de transação');
    }
    
    if (category.key === 'category') {
      return Alert.alert('Selecione uma caterogia');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const dataKey = `@gofinance:transactions_user:${user.id}`;
      
      const data = await AsyncStorage.getItem(dataKey);
      const currentData: string[] = data ? JSON.parse(data) : [];

      const formattedDate = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedDate));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigate('Listagem');

    } catch (error) {
      console.error(error);
      Alert.alert('Não foi possível salvar')
    }
  }

  return (
    <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss}
      style={{
        flex: 1
      }}
      containerStyle={{
        flex: 1
      }}  
    >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control} 
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors?.name && errors?.name.message}
            />
            <InputForm
              name="amount"
              control={control} 
              placeholder='Preço'
              keyboardType='numeric'
              error={errors?.amount && errors?.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton 
                title='Income'
                type='up'
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
                />
              <TransactionTypeButton 
                title='Outcome'
                type='down'
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionsTypes>

            <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button 
            title='Enviar'
            onPress={handleSubmit(handleRegister)}  
          />
        </Form>

        <Modal 
          visible={categoryModalOpen}
          statusBarTranslucent  
        >
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}