// import { StyleSheet } from 'react-native';
import { useField } from 'formik'
import { Input, FormControl, WarningOutlineIcon } from 'native-base'

// const styles = StyleSheet.create({
// });

interface prop {
  name: string,
  placeholder: string
}

const FormikTextInput = ({ name, placeholder }: prop) => {
  const [field, meta, helpers] = useField(name)
  const showError = (meta.touched && meta.error) as boolean | undefined

  return (
    <>
      <FormControl isInvalid={showError} w="100%">
        <Input colorScheme="secondary" mt="1" 
          onChangeText={value => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {meta.error}
        </FormControl.ErrorMessage>
      </FormControl>
    </>
  );
};

export default FormikTextInput;