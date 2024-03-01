import httpClient from "@/utils/httpClient.utility";
import { CustomField } from "wms-models/lib/custom.field";
import { EEntity } from "wms-models/lib/shared";

const API_PATH = "/custom-fields";

export const getCustomFields = async (data: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/list`, {
    method: "POST",
    data,
  });
};

export const getCustomField = async (fieldId: string): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${fieldId}`, {
    method: "GET",
  });
};

export const createCustomField = async (
  data: Partial<CustomField>
): Promise<any> => {
  return await httpClient<any>(`${API_PATH}`, {
    method: "POST",
    data,
  });
};

export const updateCustomField = async (
  fieldId: string,
  data: Partial<CustomField>
): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${fieldId}`, {
    method: "PUT",
    data,
  });
};

export const removeCustomField = async (fieldId: string): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${fieldId}`, {
    method: "DELETE",
  });
};

export const fieldVerification = async (
  fieldId: string,
  signal?: AbortSignal
): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/${fieldId}/unique`, {
    method: "GET",
    signal,
  });
};

export const getAllUnMapped = async (entity: EEntity): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/all/unmapped`, {
    method: "POST",
    data: {
      entity,
    },
  });
};
