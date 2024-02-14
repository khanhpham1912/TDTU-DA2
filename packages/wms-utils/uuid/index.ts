import { typeid } from 'typeid-js';

export function uuid() {
  return typeid().toUUID();
}
