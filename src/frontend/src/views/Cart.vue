<template>
  <form class="layout-form" @submit.prevent="submitOrder">
    <div class="popup" v-if="isModalOrder">
      <a href="#" class="close" @click.prevent="isModalOrder = !isModalOrder">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a href="#" class="button">Отлично, я жду!</a>
      </div>
    </div>
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!cartItems.length" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <ul class="cart-list sheet">
            <li
              v-for="(product, i) in cartItems"
              :key="i"
              class="cart-list__item"
            >
              <div class="product cart-list__product">
                <img
                  src="../assets/img/product.svg"
                  class="product__img"
                  width="56"
                  height="56"
                  :alt="product.name"
                />
                <div class="product__text">
                  <h2>{{ product.name }}</h2>
                  <ul>
                    <li>
                      {{ product.size.name }},
                      {{
                        product.dough.value === "large"
                          ? "на толстом тесте"
                          : "на тонком тесте"
                      }}
                    </li>
                    <li>Соус: {{ product.sauce.name }}</li>
                    <li>
                      Начинка:
                      <template v-for="ingredient in product.ingredients">
                        {{ ingredient.name }},
                      </template>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="counter cart-list__counter">
                <button
                  type="button"
                  class="counter__button counter__button--minus"
                  @click="decrement(product)"
                >
                  <span class="visually-hidden">Меньше</span>
                </button>
                <input
                  type="text"
                  name="counter"
                  class="counter__input"
                  :value="product.qty"
                />
                <button
                  type="button"
                  class="
                    counter__button
                    counter__button--plus
                    counter__button--orange
                  "
                  @click="increment(product)"
                >
                  <span class="visually-hidden">Больше</span>
                </button>
              </div>

              <div class="cart-list__price">
                <b>{{ (product.price * product.qty) | formattedPrice }} ₽</b>
              </div>

              <div class="cart-list__button">
                <button
                  type="button"
                  class="cart-list__edit"
                  @click="changePizza(product)"
                >
                  Изменить
                </button>
              </div>
            </li>
          </ul>

          <div class="cart__additional">
            <ul class="additional-list">
              <li
                v-for="el in misc"
                :key="el.id"
                class="additional-list__item sheet"
              >
                <p class="additional-list__description">
                  <img :src="el.image" width="39" height="60" :alt="el.name" />
                  <span>{{ el.name }}</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--minus"
                      :disabled="el.qty < 1"
                      @click="changeMisc(el, el.qty - 1)"
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      :value="el.qty"
                      readonly
                    />
                    <button
                      type="button"
                      class="
                        counter__button
                        counter__button--plus
                        counter__button--orange
                      "
                      @click="changeMisc(el, el.qty + 1)"
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>

                  <div class="additional-list__price">
                    <b>× {{ el.price }} ₽</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select name="test" class="select" v-model="delivery">
                  <option value="1">Заберу сам</option>
                  <option value="2">Новый адрес</option>
                  <option value="3">Дом</option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input
                  type="text"
                  name="tel"
                  placeholder="+7 999-999-99-99"
                  v-model="phone"
                />
              </label>

              <div class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input type="text" name="street" v-model="address" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input type="text" name="house" v-model="house" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input type="text" name="apartment" v-model="apartment" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
    <section v-if="cartItems.length" class="footer">
      <div class="footer__more">
        <a
          href="#"
          @click.prevent="newPizza"
          class="button button--border button--arrow"
        >
          Хочу еще одну
        </a>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ price | formattedPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { formattedPrice } from "../common/helpers";
import { uniqueId } from "lodash";

export default {
  name: "Cart",
  data() {
    return {
      delivery: "1",
      phone: "",
      address: "",
      house: "",
      apartment: "",
      isModalOrder: false,
    };
  },
  computed: {
    ...mapState("Cart", {
      cartItems: "cartItems",
      misc: "misc",
    }),
    ...mapState("Builder", {
      pizza: "pizza",
    }),
    ...mapGetters("Cart", {
      price: "price",
    }),
  },
  filters: {
    formattedPrice,
  },
  methods: {
    changeMisc(el, count) {
      if (count >= 0) {
        let item = el;
        item.qty = count;
        this.$store.dispatch("Cart/changeMisc", item);
      }
    },
    newPizza() {
      let product = {
        dough: this.pizza.dough[0],
        size: this.pizza.sizes[0],
        sauce: this.pizza.sauces[0],
        ingredients: [],
        name: "",
        qty: 1,
        price: 0,
        id: uniqueId(),
      };
      this.$store.dispatch("Builder/setPizza", product);
      this.$router.push("/");
    },
    changePizza(product) {
      this.$store.dispatch("Builder/setPizza", product);
      this.$router.push("/");
    },
    increment(product) {
      product.qty = product.qty + 1;
      this.$store.dispatch("Cart/changeCart", product);
    },
    decrement(product) {
      product.qty = product.qty - 1;
      this.$store.dispatch("Cart/changeCart", product);
    },
    submitOrder() {
      this.$store.dispatch("Cart/deleteCart");
      this.isModalOrder = true;
    },
  },
};
</script>
