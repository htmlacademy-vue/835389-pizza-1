export const normalizePizza = (property, arr) => {
  return {
    ...property,
    value: arr.find((item) => item.name === property.name).value,
  };
};

export const formattedPrice = (price) => {
  price = Number.prototype.toFixed.call(parseFloat(price) || 0, 0);
  price = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  return price;
};
