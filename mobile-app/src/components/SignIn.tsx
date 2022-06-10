// Formik x React Native example
import React, { Dispatch, useEffect } from 'react';
import { Formik } from 'formik';
import { Box, Button, Container, Image, Text, Divider, View, Icon, VStack, HStack, IconButton, CloseIcon } from 'native-base'
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import { AiOutlineGoogle } from 'react-icons/ai'
import { StyleSheet } from 'react-native';
import { ErrorResponse, LoginInfo } from '../types';
import { loginUser } from '../state/action-creators'
import { useAppDispatch } from '../state/hooks/hooks'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;



const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const styles = StyleSheet.create({
  image_style: {
    height: 100,
    marginBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});







const SignIn = ({ route, navigation }: Props) => {


  const dispatch: Dispatch<any> = useAppDispatch()

  const onSubmit = async (login_info: LoginInfo) => {
    try {
      console.log('sending dispatch login_info')
      const info = await dispatch(loginUser(login_info))
      navigation.navigate('Home')

    } catch (error) {
      const error_obj = error as ErrorResponse
      console.log(error_obj.error_message)
    }
  }


  return (
    <>
      <View style={styles.container}>

        <Container>
          <Formik
            initialValues={{
              email: 'Email',
              password: 'Password',
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >

            {({ handleSubmit }) => {
              return (
                <>
                  <Box alignItems="center" shadow={2} p="12">
                    <Image source={require('../../assets/logo.png')} alt="Alternate Text" size="xl" style={styles.image_style} />

                    <FormikTextInput name="email" placeholder="Email" show={true} />
                    <FormikTextInput name="password" placeholder="Password" show={false} />
                    <Text mt="1" fontSize="xs" opacity="50%">Forgot Password?</Text>
                    <Button style={{ marginTop: 15 }} onPress={() => handleSubmit()} w="100%" colorScheme="secondary">Login</Button>
                    <Text flexDir="row" fontSize="xs" opacity="50%" mt="3">or sign in with</Text>
                    <Divider my={2} />
                    <Button startIcon={<Icon as={AiOutlineGoogle} name="google-icon" color="coolGray.800" _dark={{
                      color: "warmGray.50"
                    }} />} w="100%" variant="outline">Sign in with Google</Button>
                  </Box>
                </>
              )

            }}

          </Formik>
        </Container>
      </View>

    </>
  )

}



export default SignIn