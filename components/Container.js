import { Flex, useColorMode } from '@chakra-ui/react';

export const Container = (props) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: 'blue.300', dark: 'blue.400' };

  const color = { light: 'black', dark: 'white' };
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};
