// Formik x React Native example
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Box, Button, Container, Image, Text, Divider, View, Icon, VStack, HStack, IconButton, CloseIcon } from 'native-base'
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AiOutlineGoogle } from 'react-icons/ai'
import { StyleSheet } from 'react-native';
import loginService from '../services/login';
import { LoginInfo, DriverToken } from '../types';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state'
import { Alert } from "native-base";


const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const styles = StyleSheet.create({
  image_style: {
    height: 100,
    marginBottom: 10
  }

});




const SignIn = () => {


  const dispatch = useDispatch()
  // const {loginUser} = bindActionCreators(actionCreators, dispatch)


  const onSubmit = async (login_info: LoginInfo) => {
    try {
      console.log('inside login')
      // await loginUser(login_info)
      // loginAlert()

    } catch (error) {
      console.log(error)
    }
  }

  // const loginAlert = () => {
  //   return <Alert w="100%" status={"success"}>
  //     <VStack space={2} flexShrink={1} w="100%">
  //       <HStack flexShrink={1} space={2} justifyContent="space-between">
  //         <HStack space={2} flexShrink={1}>
  //           <Alert.Icon mt="1" />
  //           <Text fontSize="md" color="coolGray.800">
  //             {"test alert"}
  //           </Text>
  //         </HStack>
  //         <IconButton variant="unstyled" _focus={{
  //           borderWidth: 0
  //         }} icon={<CloseIcon size="3" color="coolGray.600" />} />
  //       </HStack>
  //     </VStack>
  //   </Alert>;
  // }




  return (
    <>
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

    </>
  )

}



export default SignIn