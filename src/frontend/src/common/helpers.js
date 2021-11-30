export const normalizePizza = (property, arr) => {
  return {
    ...property,
    value: arr.find((item) => item.name === property.name).value,
  };
};
