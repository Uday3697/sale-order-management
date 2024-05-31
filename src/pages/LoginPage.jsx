import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, FormControl, FormLabel, Heading, VStack, useToast } from "@chakra-ui/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      localStorage.setItem("auth", "true");
      navigate("/active-sales");
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your username and password.",
        status: "error",
        duration: 88885000,
        isClosable: true,
        position: "bottom",
        variant: "solid",
        containerStyle: {
            backgroundColor: "red.600",
            color: "white",
            borderRadius: "8px",
            padding: "16px",
            fontSize: "16px",
            width:400,
            bgImage:''
          },
          
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg="gray.800"
      color="white"
    >
      <VStack
        spacing={4}
        p={6}
        bg="gray.700"
        borderRadius="md"
        boxShadow="lg"
        width="full"
        maxWidth="300px"
      >
        <Heading as="h1" size="lg">Login</Heading>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your username" 
            bg="gray.600"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
            bg="gray.600"
          />
        </FormControl>
        <Button colorScheme="teal" width={180} onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
