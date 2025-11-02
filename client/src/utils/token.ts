const TOKEN_NAME = "token";

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_NAME, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_NAME);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_NAME);
}

