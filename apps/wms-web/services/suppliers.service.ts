import httpClient from "@/utils/httpClient.utility";

const API_PATH = "/suppliers";

export const getSuppliers = async (request: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/list`, {
    method: "POST",
    data: request,
  });
};

export const getSupplier = async (itemId: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "GET",
  });
};

export const createSupplier = async (data: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}`, {
    method: "POST",
    data,
  });
};

export const updateSupplier = async (itemId: any, data: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "PUT",
    data,
  });
};

export const deleteSupplier = async (itemId: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${itemId}`, {
    method: "DELETE",
  });
};
