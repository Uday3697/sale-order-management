import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Spinner, Box } from "@chakra-ui/react";
import { useState } from "react";
import SaleOrderForm from "./SaleOrderForm";
import { useCustomers, useOrders } from "../api/api";
import { InfoIcon } from "@chakra-ui/icons";

const SaleOrderTable = ({ status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const { data: orders, isLoading, error } = useOrders();
  const { data: customers } = useCustomers();

  if (isLoading) return <Spinner size="xl" />;

  const handleEdit = (order) => {
    setCurrentOrder(order);
    setIsOpen(true);
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((customer) => customer.id === customerId);
    return customer ? customer.name : "Unknown";
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <Box overflowX="auto" maxWidth="100%">
        <Table variant="striped" colorScheme="gray" width="100%" minWidth="800px">
          <Thead>
            <Tr>
              <Th border="1px" borderColor="gray.200" minWidth="100px">ID</Th>
              <Th border="1px" borderColor="gray.200" minWidth="200px">Customer Name</Th>
              <Th border="1px" borderColor="gray.200" minWidth="150px">Total Price</Th>
              <Th border="1px" borderColor="gray.200" minWidth="200px">Last Modified</Th>
              <Th border="1px" borderColor="gray.200" minWidth="100px">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.id} border="1px" borderColor="gray.200">
                <Td border="1px" borderColor="gray.200">{order.customer_id}</Td>
                <Td border="1px" borderColor="gray.200">{getCustomerName(order.customer_id)}</Td>
                <Td border="1px" borderColor="gray.200">{calculateTotalPrice(order.items)}</Td>
                <Td border="1px" borderColor="gray.200">{new Date(order.invoice_date).toLocaleDateString()}</Td>
                <Td border="1px" borderColor="gray.200">
                  <IconButton
                    icon={<InfoIcon />}
                    onClick={() => handleEdit(order)}
                    aria-label="Edit/View Order"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <SaleOrderForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultValues={currentOrder}
        isReadOnly={status === "completed"}
      />
    </>
  );
};

export default SaleOrderTable;
