import {
  ZENCHEF_CONFIG_CLASS,
  isZenchefConfigured,
  zenchefConfig,
} from "@/lib/zenchef/config";

/**
 * Static config element required by the Zenchef SDK before sdk.min.js runs.
 * @see https://sdk.zenchef.com/configure.html
 */
export default function ZenchefEmbed() {
  if (!isZenchefConfigured()) {
    return null;
  }

  return (
    <div
      className={ZENCHEF_CONFIG_CLASS}
      aria-hidden="true"
      data-restaurant={zenchefConfig.restaurantId}
      data-primary-color={zenchefConfig.primaryColor}
      data-lang={zenchefConfig.lang}
      data-position={zenchefConfig.widgetPosition}
      {...(zenchefConfig.hideButton
        ? { "data-hide-default-button": "true" }
        : {})}
    />
  );
}
