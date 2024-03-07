import httpClient from "@/utils/httpClient.utility";
import { Item } from "wms-models/lib/items";

const API_PATH = "/items";

export const getItems = async (request: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/list`, {
    method: "POST",
    data: request,
  });
};

export const getItem = async (itemId: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "GET",
  });
};

export const createItem = async (data: Item): Promise<any> => {
  return await httpClient<any>(`${API_PATH}`, {
    method: "POST",
    data,
  });
};

export const updateItem = async (itemId: any, data: Item): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "PUT",
    data,
  });
};

export const deleteItem = async (itemId: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "DELETE",
  });
};

export const skuVerify = async (sku: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${sku}/check-sku`, {
    method: "GET",
  });
};

export const getInventory = async (itemId: any): Promise<any> => {
  return await httpClient<any>(`/inventories/${itemId}`, {
    method: "GET",
  });
};

export const getInventoryAvailable = async (itemId: any): Promise<any> => {
  return await httpClient<any>(`/inventories/${itemId}/available`, {
    method: "GET",
  });
};
