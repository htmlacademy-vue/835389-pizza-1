<template>
  <main class="layout">
    <AppLayoutSidebar />
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>
      <section class="sheet order" v-for="order in orders" :key="order.id">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{ orderPrice(order) }} ₽</span>
          </div>

          <div class="order__button" @click="deleteOrder(order.id)">
            <button type="button" class="button button--border">Удалить</button>
          </div>
          <div class="order__button" @click="repeatOrder(order)">
            <button type="button" class="button">Повторить</button>
          </div>
        </div>

        <ul class="order__list">
          <li
            class="order__item"
            v-for="pizza in order.orderPizzas"
            :key="pizza.id"
          >
            <div class="product">
              <img
                src="../assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{ pizza.sizes.name }},
                    {{ productDough(pizza.dough.value) }}
                  </li>
                  <li>Соус: {{ pizza.sauces.name }}</li>
                  <li>Начинка: {{ productIngredients(pizza.ingredients) }}</li>
                </ul>
              </div>
            </div>

            <p class="order__price">
              <template v-if="pizza.quantity > 1">
                {{ pizza.quantity }} х
              </template>
              {{ pizza.pricePizza }} ₽
            </p>
          </li>
        </ul>

        <ul class="order__additional">
          <li v-for="misc in order.orderMisc" :key="misc.id">
            <img :src="misc.image" width="20" height="30" :alt="misc.name" />
            <p>
              <span>{{ misc.name }}</span>
              <b>
                <template v-if="misc.quantity > 1">
                  {{ misc.quantity }} х
                </template>
                {{ misc.price }} ₽
              </b>
            </p>
          </li>
        </ul>

        <p class="order__address" v-if="order.addressId">
          Адрес доставки:
          {{ addresses.find((item) => item.id === order.addressId).name }}
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
  methods: {
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
  created() {
    this.$store.dispatch("Orders/getOrders");
    this.$store.dispatch("Auth/getAddresses");
  },
};
</script>
