/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly BANK_ACCOUNT_NAME?: string;
  readonly BANK_NAME?: string;
  readonly BANK_ACCOUNT_NUMBER?: string;
  readonly QRIS_IMAGE_PATH?: string;
  readonly ORDER_ADMIN_USERNAME?: string;
  readonly ORDER_ADMIN_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
