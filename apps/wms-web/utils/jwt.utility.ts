const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url?.replace(/-/g, "+")?.replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64 as string)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const validateJwtToken = async (): Promise<boolean> => {
  try {
    const token: any = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    const decodedJwt = parseJwt(token);
    if (decodedJwt?.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
