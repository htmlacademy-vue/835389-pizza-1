<template>
  <main class="layout">
    <AppLayoutSidebar data-test="sidebar" />
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>
      <section
        v-for="order in orders"
        :key="order.id"
        class="sheet order"
        data-test="order-item"
      >
        <div class="order__wrapper">
          <div class="order__number">
            <b data-test="order-id">Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{ orderPrice(order) }} ₽</span>
          </div>

          <div
            class="order__button"
            data-test="delete-order"
            @click="deleteOrder(order.id)"
          >
            <button type="button" class="button button--border">Удалить</button>
          </div>
          <div
            class="order__button"
            data-test="repeat-order"
            @click="repeatOrder(order)"
          >
            <button type="button" class="button">Повторить</button>
          </div>
        </div>

        <ul class="order__list">
          <li
            v-for="pizza in order.orderPizzas"
            :key="pizza.id"
            class="order__item"
            data-test="order-pizza-item"
          >
            <div class="product">
              <img
                src="../assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
                data-test="product-img"
              />
              <div class="product__text">
                <h2 data-test="product-name">
                  {{ pizza.name }}
                </h2>
                <ul>
                  <li>
                    <span data-test="product-size">
                      {{ pizza.sizes.name }} </span
                    >,
                    <span data-test="product-dough">
                      {{ productDough(pizza.dough.value) }}
                    </span>
                  </li>
                  <li data-test="product-sauce">
                    Соус: {{ pizza.sauces.name }}
                  </li>
                  <li data-test="product-ingredients">
                    Начинка: {{ productIngredients(pizza.ingredients) }}
                  </li>
                </ul>
              </div>
            </div>

            <p class="order__price" data-test="product-price">
              <template v-if="pizza.quantity > 1">
                {{ pizza.quantity }} х
              </template>
              {{ pizza.pricePizza }} ₽
            </p>
          </li>
        </ul>

        <ul class="order__additional">
          <li
            v-for="misc in order.orderMisc"
            :key="misc.id"
            data-test="misc-item"
          >
            <img
              :src="misc.image"
              width="20"
              height="30"
              :alt="misc.name"
              data-test="misc-img"
            />
            <p>
              <span data-test="misc-name">{{ misc.name }}</span>
              <b data-test="misc-price">
                <template v-if="misc.quantity > 1">
                  {{ misc.quantity }} х
                </template>
                {{ misc.price }} ₽
              </b>
            </p>
          </li>
        </ul>

        <p
          v-if="order.addressId"
          class="order__address"
          data-test="order-address"
        >
          {{ addressStr(order.addressId) }}
        </p>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import AppLayoutSidebar from "../layouts/AppLayoutSidebar";
import { uniqueId } from "lodash";

export default {
  name: "Orders",

  components: { AppLayoutSidebar },

  computed: {
    ...mapGetters("Orders", {
      orders: "formattedOrders",
    }),

    ...mapState("Cart", {
      misc: "misc",
    }),

    ...mapState("Auth", {
      addresses: "addresses",
    }),
  },

  created() {
    this.$store.dispatch("Orders/getOrders");
    this.$store.dispatch("Auth/getAddresses");
  },

  methods: {
    addressStr(id) {
      return `Адрес доставки: ${
        this.addresses.find((item) => item.id === id).name
      }`;
    },

    productDough(value) {
      return value === "large" ? "на толстом тесте" : "на тонком тесте";
    },

    productIngredients(items) {
      let ingredients = items.map((item) => item.name);
      return ingredients.join(", ");
    },

    deleteOrder(id) {
      this.$store.dispatch("Orders/deleteOrder", id);
    },

    repeatOrder(order) {
      let cartItems = order.orderPizzas.map((item) => {
        return {
          sizes: item.sizes,
          dough: item.dough,
          sauces: item.sauces,
          name: item.name,
          qty: item.quantity,
          id: uniqueId(),
          ingredients: item.ingredients.map((ingredient) => {
            return {
              id: ingredient.ingredientId,
              name: ingredient.name,
              price: ingredient.price,
              count: ingredient.quantity,
              value: ingredient.value,
            };
          }),
        };
      });
      let miscItems = this.misc.slice();
      if (order.orderMisc && order.orderMisc.length) {
        miscItems = miscItems.map((item) => {
          let miscOrder = order.orderMisc.find((el) => el.miscId === item.id);
          if (miscOrder) {
            return {
              ...item,
              qty: miscOrder.quantity,
            };
          } else {
            return item;
          }
        });
      }
      this.$store.dispatch("Cart/setCart", { cartItems, miscItems });
      this.$router.push("/cart");
    },

    orderPrice(order) {
      let pizzasPrice = order.orderPizzas.reduce((sum, item) => {
        return sum + item.quantity * item.pricePizza;
      }, 0);
      let miscPrice = 0;
      if (order.orderMisc && order.orderMisc.length > 0) {
        miscPrice = order.orderMisc.reduce((sum, item) => {
          return sum + item.quantity * item.price;
        }, 0);
      }
      return miscPrice + pizzasPrice;
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/order";
</style>
