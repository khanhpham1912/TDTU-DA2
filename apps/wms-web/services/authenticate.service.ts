import httpClient from "@/utils/httpClient.utility";

export const login = async (request: Partial<any>): Promise<any> => {
  return await httpClient<any>(`/auth/login`, {
    method: "POST",
    data: request,
  });
};
