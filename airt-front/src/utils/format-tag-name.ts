export const formatTagName = (value = "") => {
  // replace all space with -
  return value
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
    .replaceAll("_", "-")
    .toLowerCase();
};
