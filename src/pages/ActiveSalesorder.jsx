
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import SaleOrderTable from "../components/SaleOrderTable";
import SaleOrderForm from "../components/SaleOrderForm";

const ActiveSalesorder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Button onClick={() => setIsOpen(true)}>+ Sale Order</Button>
      <SaleOrderTable status="active" />
      <SaleOrderForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  );
};



export default ActiveSalesorder
