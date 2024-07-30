import { Box, useCheckbox } from '@chakra-ui/react';

const CheckCard = (props) => {
  const { state, getInputProps, getCheckboxProps } = useCheckbox(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
                bg={state.isChecked ?'green.500':'green.50'}        
color={state.isChecked && "white"}
          
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
                boxShadow='md'
                px={5}
                py={3}
            >
        {props.children}
      </Box>
    </Box>
  )
}
export default CheckCard
