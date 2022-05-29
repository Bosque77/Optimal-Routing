// Formik x React Native example
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Box, Button, Container, Image, Text, Divider, View, Icon } from 'native-base'
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {AiOutlineGoogle} from 'react-icons/ai'



const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

// const styles = StyleSheet.create({

// });




const SignIn = () => {



  // const onSubmit = async (values) => {
  //   const { username, password } = values;

  //   try {
  //     await signIn({ username, password });
  //     if(!result.loading){
  //       console.log(result.data.authenticate.accessToken)
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const onSubmit = () => {
    console.log('inside on submit')
  }


  return (
    <>
      <Container>



        <Formik
          initialValues={{
            username: 'Username',
            password: 'Password',
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >

          {({ handleSubmit }) => {
            return (
              <>
                <Box alignItems="center" shadow={2} p="12">
                  <Image source={require('../../assets/icon.png')} alt="Alternate Text" size="xl" />

                  <FormikTextInput name="username" placeholder="Username" />
                  <FormikTextInput name="password" placeholder="Password" />
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

};



export default SignIn