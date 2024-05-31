import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Spinner, Flex } from "@chakra-ui/react";
import { useState } from "react";
import SaleOrderForm from "./SaleOrderForm";
import { useOrders } from "../api/api";

const SaleOrderTable = ({ status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const { data: orders, isLoading,error } = useOrders();

  if (isLoading) return <Spinner size="xl" />;

  const handleEdit = (order) => {
    setCurrentOrder(order);
    setIsOpen(true);
  };

  console.log("--------------------------orders",orders);

  return (
    <Flex >
      
      <Table variant="striped" size="md" colorScheme="gray">
        <Thead>
          <Tr>
            <Th border="1px" borderColor="gray.200">ID</Th>
            <Th border="1px" borderColor="gray.200">Customer Name</Th>
            <Th border="1px" borderColor="gray.200">Price</Th>
            <Th border="1px" borderColor="gray.200">Last Modified</Th>
            <Th border="1px" borderColor="gray.200">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map(order => (
            <Tr key={order.id} border="1px" borderColor="gray.200">
              <Td border="1px" borderColor="gray.200">{order.customer_id}</Td>
              <Td border="1px" borderColor="gray.200">{order.customer_name}</Td>
              <Td border="1px" borderColor="gray.200">{order.price}</Td>
              <Td border="1px" borderColor="gray.200">{new Date(order.last_modified).toLocaleDateString()}</Td>
              <Td border="1px" borderColor="gray.200">
                <IconButton
                  icon={"..."}
                  onClick={() => handleEdit(order)}
                  aria-label="Edit/View Order"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <SaleOrderForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultValues={currentOrder}
        isReadOnly={status === "completed"}
      />
    </Flex>
  );
};

export default SaleOrderTable;
