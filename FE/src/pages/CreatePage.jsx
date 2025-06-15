import React, { useState } from 'react'
import {
  Container,
  VStack,
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  useToast,
  Text
} from '@chakra-ui/react';
import { useNoteStore } from '../store/note';

const CreatePage = () => {
  const [newNote, setNewNote] = useState({
    title: "",
    content: ""
  });

  const toast = useToast();
  const { createNote } = useNoteStore();

  const handleAddNote = async () => {
    const { success, message } = await createNote(newNote);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true
      });
      setNewNote({ title: "", content: "" });
    }
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Text fontSize={"30"}
          fontWeight={"bold"} 
          textAlign={"center"} 
          textColor={useColorModeValue("white", "black")}>
          Create New Note
        </Text>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "black")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder='Title'
              name='title'
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <Textarea
              placeholder='Content'
              name='content'
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            />
            <Button
              colorScheme={useColorModeValue("yellow", "orange")}
              onClick={handleAddNote}
              w='full'
            >
              Add Note
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
