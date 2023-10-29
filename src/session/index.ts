function setSessionCookie(token: string) {
  document.cookie = `session=${token};path=/;`
}

export { setSessionCookie }
