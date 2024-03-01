import httpClient from "@/utils/httpClient.utility";

const API_PATH = "/outbound-orders";

export const getOutbounds = async (request: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/list`, {
    method: "POST",
    data: request,
  });
};

export const getOutbound = async (itemId: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "GET",
  });
};

export const createOutbound = async (data: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}`, {
    method: "POST",
    data,
  });
};

export const updateOutbound = async (itemId: any, data: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "PUT",
    data,
  });
};

export const deleteOutbound = async (itemId: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "DELETE",
  });
};
