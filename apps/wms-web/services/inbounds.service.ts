import httpClient from "@/utils/httpClient.utility";
import { Item } from "wms-models/lib/items";

const API_PATH = "/inbound-orders";

export const getInbounds = async (request: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/list`, {
    method: "POST",
    data: request,
  });
};

export const getInbound = async (itemId: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "GET",
  });
};

export const createInbound = async (data: Item): Promise<any> => {
  return await httpClient<any>(`${API_PATH}`, {
    method: "POST",
    data,
  });
};

export const updateInbound = async (itemId: any, data: Item): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "PUT",
    data,
  });
};

export const deleteInbound = async (itemId: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "DELETE",
  });
};
