import React, { useEffect } from 'react';
import { Container, Text, VStack, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useNoteStore } from '../store/note.js';
import NoteCard from "../components/NoteCard.jsx";

const HomePage = () => {
  const { fetchNotes, notes } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bg={useColorModeValue("white", "black")}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Notes 📝
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={"full"}
        >
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </SimpleGrid>

        {notes.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            No notes found 😢{" "}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a note
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;