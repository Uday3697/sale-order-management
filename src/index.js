import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react';
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'


const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
const { Button } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
  },
})
root.render(
  <React.StrictMode>

    <ChakraProvider>
      <ChakraBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ChakraBaseProvider>
    </ChakraProvider>

  </React.StrictMode>
);

reportWebVitals();
