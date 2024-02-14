const IGNORE_FIELDS = ['password', 'currentPassword', 'newPassword', 'repeastPassword', 'token'];

export const IGNORE_LOG_KEYS = ['authentication-service.authenticate', ':db:'];

export function removeBodyIgnoreFields(body: any) {
  const newBody = JSON.parse(JSON.stringify(body || {}));
  const ignoreFieldSet = new Set(IGNORE_FIELDS);

  Object.keys(newBody).forEach((key) => {
    if (ignoreFieldSet.has(key)) {
      newBody[key] = 'xxxxxx';
    }
  });

  return newBody;
}
