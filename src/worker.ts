export default {
  async fetch(request, env) {
    return env.ASSETS?.fetch(request) || new Response('Not Found', { status: 404 });
  },
};
