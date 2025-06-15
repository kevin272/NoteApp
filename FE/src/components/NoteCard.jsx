import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useToast,
  Button,
  VStack,
  Input,
} from '@chakra-ui/react';
import { useNoteStore } from '../store/note'; 
import { useDisclosure } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';

const NoteCard = ({ note }) => {
  const [updatedNote, setUpdatedNote] = useState(note);

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'black');
  const { deleteNote, updateNote } = useNoteStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteNote = async (nid) => {
    const { success, message } = await deleteNote(nid);
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateNote = async (nid, updatedNote) => {
    const { success, message } = await updateNote(nid, updatedNote);
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
    if (success) onClose();
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
      p={4}
    >
      <Heading as="h3" size="md" mb={2}>
        {note.title}
      </Heading>
      <Text color={textColor} mb={4}>
        {note.content}
      </Text>
      <HStack spacing={2}>
        <IconButton
  icon={<EditIcon />}
  bg={useColorModeValue("black", "white")}
  color={useColorModeValue("white", "black")}         
  _hover={{ bg: useColorModeValue("green", "green") }} 
  onClick={onOpen}
/>

        <IconButton
          icon={<DeleteIcon />}
          bg={useColorModeValue("black", "white")}
          color="red"
          _hover={{ bg: useColorModeValue("red.500", "red.500") }}
          onClick={() => handleDeleteNote(note._id)}
        />
      </HStack>

      {/* Modal for Edit */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Title"
                name="title"
                value={updatedNote.title}
                onChange={(e) =>
                  setUpdatedNote({ ...updatedNote, title: e.target.value })
                }
              />
              <Input
                placeholder="Content"
                name="content"
                value={updatedNote.content}
                onChange={(e) =>
                  setUpdatedNote({ ...updatedNote, content: e.target.value })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => handleUpdateNote(note._id, updatedNote)}
            >
              Update
            </Button>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NoteCard;
