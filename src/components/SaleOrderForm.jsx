import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  HStack,
  Box
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useProducts, useCustomers, useAddOrder } from "../api/api";

const SaleOrderForm = ({ isOpen, onClose, defaultValues, isReadOnly }) => {
  const { control, handleSubmit, watch, register } = useForm({ defaultValues });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const { data: products } = useProducts();
  const { data: customers } = useCustomers();
  const addOrderMutation = useAddOrder();

  const onSubmit = (data) => {
    addOrderMutation.mutate(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isReadOnly ? "View Sale Order" : "Create/Edit Sale Order"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isReadOnly={isReadOnly}>
              <FormLabel>Customer</FormLabel>
              <Controller
                name="customer_id"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    {customers?.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <Accordion allowToggle>
              {products?.map((product) => (
                <AccordionItem key={product.id}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {product.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {product.skus.map((sku) => (
                      <HStack key={sku.id}>
                        <Checkbox
                          onChange={(e) => {
                            if (e.target.checked) {
                              append({
                                sku_id: sku.id,
                                price: sku.selling_price,
                                quantity: 1,
                              });
                            } else {
                              const index = fields.findIndex(
                                (field) => field.sku_id === sku.id
                              );
                              remove(index);
                            }
                          }}
                          isChecked={fields.some(
                            (field) => field.sku_id === sku.id
                          )}
                        >
                          SKU ID: {sku.id} - Price: {sku.selling_price}
                        </Checkbox>
                        <Input
                          type="number"
                          placeholder="Quantity"
                          isDisabled={
                            !fields.some((field) => field.sku_id === sku.id)
                          }
                          {...register(
                            `items.${fields.findIndex(
                              (field) => field.sku_id === sku.id
                            )}.quantity`
                          )}
                        />
                      </HStack>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>

            <FormControl isReadOnly={isReadOnly}>
              <FormLabel>Invoice Number</FormLabel>
              <Controller
                name="invoice_no"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </FormControl>

            <FormControl isReadOnly={isReadOnly}>
              <FormLabel>Invoice Date</FormLabel>
              <Controller
                name="invoice_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={new Date(field.value)}
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
            </FormControl>

            <ModalFooter>
              {!isReadOnly && <Button type="submit">Save</Button>}
              <Button ml={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderForm;
