export const REGEX = {
  EMAIL_REGEX: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
  PASSWORD_REGEX: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$", // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  URL_REGEX:
    "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})",
} as const;
