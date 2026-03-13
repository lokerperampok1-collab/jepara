import { a4 as defineMiddleware, ad as sequence } from './chunks/sequence_7oStfiHe.mjs';
import '@astrojs/internal-helpers/path';
import 'piccolore';
import 'clsx';

function isAdminAuthorized(request) {
  {
    return false;
  }
}
function createUnauthorizedResponse() {
  return new Response("Login admin diperlukan.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Pesanan Gallery Furnicraft Jepara"'
    }
  });
}

const onRequest$1 = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith("/admin/") || context.url.pathname.startsWith("/api/admin/")) {
    if (!isAdminAuthorized(context.request)) {
      return createUnauthorizedResponse();
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
