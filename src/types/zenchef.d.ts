export {};

declare global {
  interface ZenchefBookingDetail {
    bookingId?: string;
    date?: string;
    pax?: number;
    slot?: string;
    room?: string;
    firstname?: string;
    lastname?: string;
    name?: string;
    email?: string;
    phone?: string;
  }

  interface ZenchefOpenParams {
    offerId?: string;
    day?: string;
    pax?: number;
    roomId?: string;
  }

  interface ZenchefWidgetAPI {
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpened: () => boolean;
    openWith: (params: ZenchefOpenParams) => void;
    openOffer: (offerId: string) => void;
    on: (
      event: string,
      callback: (event: CustomEvent<ZenchefBookingDetail>) => void
    ) => () => void;
    off: (
      event: string,
      callback: (event: CustomEvent<ZenchefBookingDetail>) => void
    ) => void;
  }

  interface Window {
    ZenchefWidget?: ZenchefWidgetAPI;
  }
}
