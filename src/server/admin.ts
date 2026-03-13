import { ORDER_ADMIN_PASSWORD, ORDER_ADMIN_USERNAME } from "@/config/commerce";

function decodeBasicHeader(header: string) {
  const encoded = header.replace(/^Basic\s+/i, "");
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const separatorIndex = decoded.indexOf(":");

  if (separatorIndex === -1) {
    return null;
  }

  return {
    username: decoded.slice(0, separatorIndex),
    password: decoded.slice(separatorIndex + 1),
  };
}

export function isAdminAuthorized(request: Request) {
  if (!ORDER_ADMIN_PASSWORD) {
    return false;
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Basic ")) {
    return false;
  }

  const credentials = decodeBasicHeader(authHeader);
  return (
    credentials?.username === ORDER_ADMIN_USERNAME &&
    credentials.password === ORDER_ADMIN_PASSWORD
  );
}

export function createUnauthorizedResponse() {
  return new Response("Login admin diperlukan.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Pesanan Gallery Furnicraft Jepara"',
    },
  });
}
