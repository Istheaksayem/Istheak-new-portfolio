export function createAuthService({ adminPassword }) {
  return {
    verify(password) {
      return password === adminPassword;
    },
  };
}
