// Formik x React Native example
import React, { Dispatch, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Box, Button, Container, Image, Text, Divider, View, Icon, VStack, HStack, IconButton, CloseIcon, AlertDialog, Center } from 'native-base'
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
  },
  formik_inputs: {
    marginTop: 15,
    width: 200
  }

});







const SignIn = ({ route, navigation }: Props) => {


  const [isOpen, setIsOpen] = useState(false);
  const [error_msg, setErrorMsg] = useState('')

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const dispatch: Dispatch<any> = useAppDispatch()



  const onSubmit = async (login_info: LoginInfo) => {
    try {
      console.log('sending dispatch login_info')
      const info = await dispatch(loginUser(login_info))
      console.log('successful login')
      console.log('about to switch screens')
      navigation.navigate('Home')

    } catch (error) {
      const error_obj = error as ErrorResponse
      console.log(error_obj.error_message)
      setErrorMsg(error_obj.error_message!)
      setIsOpen(true)
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
                    <View style={styles.formik_inputs}>
                      <FormikTextInput name="email" placeholder="Email" show={true} />
                      <FormikTextInput name="password" placeholder="Password" show={false} />
                    </View>

                    <Text mt="1" fontSize="xs" opacity="50">Forgot Password?</Text>
                    <Button style={{ marginTop: 15 }} onPress={() => handleSubmit()} px="10" size={'lg'} colorScheme="secondary">Login</Button>
                  </Box>
                </>
              )

            }}

          </Formik>

          <Center>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
              <AlertDialog.Content>
                <AlertDialog.CloseButton />
                {/* <AlertDialog.Header>Delete Customer</AlertDialog.Header> */}
                <AlertDialog.Body>
                  {error_msg}
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button.Group space={2}>
                    <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                      Ok
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          </Center>;
        </Container>
      </View>

    </>
  )

}



export default SignIn