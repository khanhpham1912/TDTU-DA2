import httpClient from "@/utils/httpClient.utility";

const API_PATH = "/custom-field-mapping";

export const getAllCustomFieldMappings = async (data: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/all`, {
    method: "POST",
    data,
  });
};

export const resortCustomField = async (data: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${data._id}/re-sorting`, {
    method: "PUT",
    data,
  });
};

export const getCustomFieldMapping = async (fieldId: string): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${fieldId}`, {
    method: "GET",
  });
};

export const createCustomFieldMapping = async (data: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}`, {
    method: "POST",
    data,
  });
};

export const updateCustomFieldMapping = async (
  fieldId: string,
  data: any
): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${fieldId}`, {
    method: "PUT",
    data,
  });
};

export const removeCustomFieldMapping = async (
  fieldId: string
): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${fieldId}`, {
    method: "DELETE",
  });
};
