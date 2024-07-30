import { Box, useRadio } from "@chakra-ui/react";

const RadioCard = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        border="2px solid #dd822c"
        color="#dd822c"
        cursor="pointer"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "#dd822c",
          color: "white",
        }}
        px={5}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
};
export default RadioCard;
