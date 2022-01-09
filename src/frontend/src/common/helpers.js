export const normalizePizza = (property, arr, type) => {
  if (type && type === "ingredients") {
    return {
      ...property,
      value: arr.find((item) => item.name === property.name).value,
      count: 0,
    };
  } else {
    return {
      ...property,
      value: arr.find((item) => item.name === property.name).value,
    };
  }
};

export const formattedPrice = (price) => {
  price = Number.prototype.toFixed.call(parseFloat(price) || 0, 0);
  price = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  return price;
};

export const normalizeMisc = (property) => {
  return {
    ...property,
    qty: 0,
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};
