import React from 'react';
import { Button, Center, Container, HStack, Flex, Text, useColorMode ,useColorModeValue} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PlusSquareIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1920px"} px={4} bg={useColorModeValue("white", "black")}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bg={useColorModeValue("black", "white")}
          bgClip={"text"}
        >
          <Link to={"/"}>Noteify 📝 </Link>
        </Text>
        
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
