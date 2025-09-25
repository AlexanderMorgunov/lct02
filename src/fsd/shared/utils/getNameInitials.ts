export const getNameInitials = (fullName: string) =>
  fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();