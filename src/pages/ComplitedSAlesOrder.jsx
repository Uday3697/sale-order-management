import { Box } from "@chakra-ui/react";
import SaleOrderTable from "../components/SaleOrderTable";

const ComplitedSAlesOrder = () => {
  return (
    <Box>
      <SaleOrderTable status="completed" />
    </Box>
  );
};


export default ComplitedSAlesOrder
