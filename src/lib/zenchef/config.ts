export const ZENCHEF_SDK_URL = "https://sdk.zenchef.com/v1/sdk.min.js";
export const ZENCHEF_SDK_SCRIPT_ID = "zenchef-sdk";
export const ZENCHEF_CONFIG_CLASS = "zc-widget-config";

export const ZENCHEF_SUPPORTED_LANGS = [
  "en",
  "fr",
  "de",
  "es",
  "it",
  "pt",
  "nl",
] as const;

export type ZenchefLang = (typeof ZENCHEF_SUPPORTED_LANGS)[number];

function resolveZenchefLang(): ZenchefLang {
  const configured = process.env.NEXT_PUBLIC_ZENCHEF_LANG?.trim().toLowerCase();

  if (
    configured &&
    ZENCHEF_SUPPORTED_LANGS.includes(configured as ZenchefLang)
  ) {
    return configured as ZenchefLang;
  }

  return "en";
}

export const zenchefConfig = {
  restaurantId:
    process.env.NEXT_PUBLIC_ZENCHEF_RESTAURANT_ID ?? "357246",
  primaryColor:
    process.env.NEXT_PUBLIC_ZENCHEF_PRIMARY_COLOR?.replace("#", "") ??
    "eaaa48",
  lang: resolveZenchefLang(),
  /** When false, the default bottom-right Zenchef button stays visible while scrolling */
  hideButton: process.env.NEXT_PUBLIC_ZENCHEF_HIDE_BUTTON === "true",
  widgetPosition: process.env.NEXT_PUBLIC_ZENCHEF_POSITION ?? "right",
} as const;

export function isZenchefConfigured() {
  return Boolean(zenchefConfig.restaurantId);
}
