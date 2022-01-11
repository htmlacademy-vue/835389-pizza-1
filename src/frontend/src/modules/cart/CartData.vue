<template>
  <form class="layout-form" @submit.prevent="submitOrder">
    <transition
      enter-active-class="animate__animated animate__fadeInDownBig"
      leave-active-class="animate__animated animate__fadeOutDownBig"
    >
      <CartModal v-if="isModalOrder" @close="closeModal" />
    </transition>
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <CartProducts />
        <CartMisc />
        <CartDelivery
          :phone="phone"
          :address="address"
          :delivery="delivery"
          @selectAddress="selectAddress"
          @changeAddress="changeAddress"
          @changePhone="changePhone"
        />
        {{ error }}
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <a
          href="#"
          @click.prevent="editPizza"
          class="button button--border button--arrow"
        >
          Хочу еще одну
        </a>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ formattedPrice(price) }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { formattedPrice } from "../../common/helpers";
import { uniqueId } from "lodash";
import CartModal from "./CartModal";
import CartProducts from "./CartProducts";
import CartMisc from "./CartMisc";
import CartDelivery from "./CartDelivery";

export default {
  name: "CartData",
  components: { CartDelivery, CartMisc, CartProducts, CartModal },
  data() {
    return {
      isModalOrder: false,
      delivery: "1",
      phone: "",
      address: {
        street: "",
        building: "",
        flat: "",
      },
      error: "",
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
    ...mapState("Auth", {
      user: "user",
      isAuthenticated: "isAuthenticated",
      addresses: "addresses",
    }),
    ...mapGetters("Cart", {
      price: "price",
    }),
    isUserAddress() {
      return this.delivery !== "1" && this.delivery !== "2";
    },
  },
  methods: {
    selectAddress(val) {
      this.delivery = val;
      if (this.isUserAddress) {
        let id = this.delivery.replace("address-", "");
        this.address = this.addresses.find((el) => (el.id = id));
      } else {
        this.address = {
          street: "",
          building: "",
          flat: "",
        };
      }
    },
    changeAddress(data) {
      this.address[data.field] = data.val;
    },
    changePhone(val) {
      this.phone = val;
    },
    formattedPrice(price) {
      return formattedPrice(price);
    },
    newPizza() {
      let product = {
        dough: this.pizza.dough[0],
        sizes: this.pizza.sizes[0],
        sauces: this.pizza.sauces[0],
        ingredients: [],
        name: "",
        qty: 1,
        price: 0,
        id: uniqueId(),
      };
      this.$store.dispatch("Builder/setPizza", product);
    },
    editPizza() {
      this.newPizza();
      this.$router.push("/");
    },
    submitOrder() {
      if (
        this.delivery !== "1" &&
        (!this.address.street.length || !this.address.building.length)
      ) {
        this.error = "Заполните Адрес";
        return;
      }
      let order = {
        userId: this.isAuthenticated ? this.user.id : null,
        phone: this.phone,
        pizzas: this.cartItems.map((item) => {
          return {
            name: item.name,
            sauceId: item.sauces.id,
            doughId: item.dough.id,
            sizeId: item.sizes.id,
            quantity: item.qty,
            ingredients: item.ingredients.map((ingredient) => {
              return {
                ingredientId: ingredient.id,
                quantity: ingredient.count,
              };
            }),
          };
        }),
        misc: this.misc
          .filter((item) => {
            return item.qty > 0;
          })
          .map((item) => {
            return {
              miscId: item.id,
              quantity: item.qty,
            };
          }),
      };
      if (this.delivery !== "1") {
        order.address = this.address;
      }
      this.$store.dispatch("Orders/createOrder", order).then((res) => {
        if (res.id) {
          this.newPizza();
          this.isModalOrder = true;
        }
      });
    },
    closeModal() {
      this.$store.dispatch("Cart/deleteCart");
      this.isModalOrder = !this.isModalOrder;
      if (this.isAuthenticated) {
        this.$router.push("/orders");
      } else {
        this.$router.push("/");
      }
    },
    setPhone() {
      if (this.isAuthenticated) {
        this.phone = this.user.phone;
      }
    },
  },
  created() {
    this.$store.dispatch("Auth/getAddresses");
    this.setPhone();
  },
};
</script>
