export default class Routes {
  static AUTH(URL) {
    return {
      endPoint: URL,
      method: 'POST',
      cache: 'no-cache',
      requireAuth: true,
    };
  }

  static NO_AUTH(URL) {
    return {
      endPoint: URL,
      method: 'POST',
      cache: 'no-cache',
    };
  }
}
