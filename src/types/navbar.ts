
export const NAV_DEFAULT = "default" as const;
export const NAV_WITH_USER = "withUser" as const;

export type NAV_TYPE = typeof NAV_DEFAULT | typeof NAV_WITH_USER;