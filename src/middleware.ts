import { defineMiddleware } from "astro:middleware";
import { createUnauthorizedResponse, isAdminAuthorized } from "@/server/admin";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith("/admin/") || context.url.pathname.startsWith("/api/admin/")) {
    if (!isAdminAuthorized(context.request)) {
      return createUnauthorizedResponse();
    }
  }

  return next();
});
