const mediaMaxWidth = (size: number) => {
  return `@media (max-width: ${size}px)`;
};

const mediaMinWidth = (size: number) => {
  return `@media (min-width: ${size}px)`;
};

export { mediaMaxWidth, mediaMinWidth };
