export const ZENCHEF_SDK_URL = "https://sdk.zenchef.com/v1/sdk.min.js";
export const ZENCHEF_SDK_SCRIPT_ID = "zenchef-sdk";
export const ZENCHEF_CONFIG_CLASS = "zc-widget-config";

export const zenchefConfig = {
  restaurantId:
    process.env.NEXT_PUBLIC_ZENCHEF_RESTAURANT_ID ?? "357246",
  primaryColor:
    process.env.NEXT_PUBLIC_ZENCHEF_PRIMARY_COLOR?.replace("#", "") ??
    "eaaa48",
  lang: process.env.NEXT_PUBLIC_ZENCHEF_LANG ?? "fr",
  /** When false, the default bottom-right Zenchef button stays visible while scrolling */
  hideButton: process.env.NEXT_PUBLIC_ZENCHEF_HIDE_BUTTON === "true",
  widgetPosition: process.env.NEXT_PUBLIC_ZENCHEF_POSITION ?? "right",
} as const;

export function isZenchefConfigured() {
  return Boolean(zenchefConfig.restaurantId);
}
