import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SaleOrderForm from "./SaleOrderForm";
import { useOrders } from "../api/api"; 

const SaleOrderTable = ({ status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const { data: orders, isLoading } = useOrders();

  if (isLoading) return <div>Loading...</div>;

  const handleEdit = (order) => {
    setCurrentOrder(order);
    setIsOpen(true);
  };

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Customer</Th>
            <Th>Invoice Number</Th>
            <Th>Invoice Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map(order => (
            <Tr key={order.id}>
              <Td>{order.customer_id}</Td>
              <Td>{order.invoice_no}</Td>
              <Td>{new Date(order.invoice_date).toLocaleDateString()}</Td>
              <Td>
                <IconButton icon={"..."} onClick={() => handleEdit(order)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <SaleOrderForm isOpen={isOpen} onClose={() => setIsOpen(false)} defaultValues={currentOrder} isReadOnly={status === "completed"} />
    </>
  );
};

export default SaleOrderTable;
