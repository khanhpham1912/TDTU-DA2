export const isEmail = (message: string) => ({ pattern:  /^\s*[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+\s*$/, message });
export const isPhone = (message: string) => ({ pattern: /^[0-9]{10}$/, message });
