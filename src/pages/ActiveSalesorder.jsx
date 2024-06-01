import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import SaleOrderTable from "../components/SaleOrderTable";
import SaleOrderForm from "../components/SaleOrderForm";

const ActiveSalesorder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box p={50} bg="gray.100" borderRadius="md" boxShadow="md" display="flex" alignItems="center" flexDir={'column'} >
      <Flex direction={"row"} gap={20}>

        <Button
          onClick={() => setIsOpen(true)}
          colorScheme="teal"
          mb={4}
          fontSize={12}

        >
          Active Sale Orders
        </Button>
        <Button
          onClick={() => setIsOpen(true)}
          colorScheme="teal"
          mb={4}
          fontSize={12}
        >
          Complited Sale Orders
        </Button>
        <Button
          onClick={() => setIsOpen(true)}
          colorScheme="teal"
          mb={4}
          fontSize={12}

        >
          + Sale Order
        </Button>
      </Flex>

      <SaleOrderTable status="active" />
      <SaleOrderForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  );
};

export default ActiveSalesorder;
