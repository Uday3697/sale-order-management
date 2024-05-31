import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import mockData from "../data/mockData.json";

// Mock API functions
const fetchOrders = async () => {
  return mockData.orders;
};

const fetchProducts = async () => {
  return mockData.products;
};

const fetchCustomers = async () => {
  return mockData.customers;
};

const addOrder = async (newOrder) => {
  mockData.orders.push(newOrder);
  return newOrder;
};

// Custom hooks
export const useOrders = () => {
  return useQuery(["orders"], fetchOrders);
};

export const useProducts = () => {
  return useQuery(["products"], fetchProducts);
};

export const useCustomers = () => {
  return useQuery(["customers"], fetchCustomers);
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(addOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    }
  });
};
