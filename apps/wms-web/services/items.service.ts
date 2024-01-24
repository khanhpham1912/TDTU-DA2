import httpClient from "@/utils/httpClient.utility";

const API_PATH = "/items";

export const getItems = async (request: any): Promise<any> => {
  return await httpClient<any>(`${API_PATH}/list`, {
    method: "POST",
    data: request,
  });
};
