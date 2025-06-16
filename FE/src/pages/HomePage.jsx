import React, { useEffect } from 'react';
import { Container, Text, VStack, SimpleGrid, useColorModeValue, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useNoteStore } from '../store/note.js';
import NoteCard from "../components/NoteCard.jsx";
import ParticlesBackground from "../components/particlesbackground";


const HomePage = () => {
  const { fetchNotes, notes } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    // <>
    // <ParticlesBackground />
    <Container maxW='container.xl' py={12} position="relative" zIndex={1}>
      <VStack spacing={8}>
        <Flex align="center" justify="center" gap={6} w="full">
          <Text
            fontSize="30"
            fontWeight="bold"
            bg={useColorModeValue("white", "black")}
            bgClip="text"
            textAlign="left"
          >
            Current Notes
          </Text>
          <img
            src='public/note.svg'
            alt='Notes'
            style={{ width: '60px', height: '60px', objectFit: 'contain' }}
          />
        </Flex>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w="full"
        >
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </SimpleGrid>

        {notes.length === 0 && (
          <Text fontSize='xl' textAlign="center" fontWeight='bold' color='gray.500'>
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
    // </>
  );
};

export default HomePage;