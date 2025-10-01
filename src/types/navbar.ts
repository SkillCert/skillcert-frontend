


export const NAV_TYPES = {
    Default: "default",
    Connected: "withUser"
} as const;

export type NavType = typeof NAV_TYPES[keyof typeof NAV_TYPES];