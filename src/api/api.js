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
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    }
  });
};
