export function auth({ next, store, nextMiddleware }) {
  if (!store.state.Auth.isAuthenticated) {
    const token = store.$jwt.getToken();
    if (token) {
      store.$api.auth.setAuthHeader();
    } else {
      next("/");
    }
  }
  return nextMiddleware();
}

export function isLoggedIn({ next, store, nextMiddleware }) {
  if (store.$jwt.getToken()) {
    next("/");
  }
  return nextMiddleware();
}
