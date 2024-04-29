import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        description: "Please enter a task before adding.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isComplete: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : task));
  };

  return (
    <Box p={5} maxW="480px" m="auto" mt="20vh" bg="white" boxShadow="md">
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="lg"
        mb={4}
      />
      <Button leftIcon={<FaPlusCircle />} colorScheme="blue" onClick={addTask} w="full">
        Add Task
      </Button>
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
            <Box as="span" textDecoration={task.isComplete ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <Box>
              <IconButton
                icon={<FaCheckCircle />}
                onClick={() => toggleComplete(task.id)}
                colorScheme={task.isComplete ? "green" : "gray"}
                aria-label="Mark as complete"
                mr={2}
              />
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteTask(task.id)}
                colorScheme="red"
                aria-label="Delete task"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;