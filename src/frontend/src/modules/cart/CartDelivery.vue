<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          @change="selectAddress($event.target.value)"
        >
          <option value="1" :selected="delivery === '1'">Заберу сам</option>
          <option value="2" :selected="delivery === '2'">Новый адрес</option>
          <option
            v-for="address in addresses"
            :key="`address-${address.id}`"
            :value="`address-${address.id}`"
            :selected="delivery === `address-${address.id}`"
          >
            {{ address.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="phone"
          @input="$emit('changePhone', $event.target.value)"
        />
      </label>
      <div class="cart-form__address" v-if="delivery !== '1'">
        <span class="cart-form__label">Новый адрес:</span>
        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :value="address.street"
              @input="changeAddress('street', $event.target.value)"
              :readonly="isUserAddress"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              :value="address.building"
              @input="changeAddress('building', $event.target.value)"
              :readonly="isUserAddress"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              :value="address.flat"
              @input="changeAddress('flat', $event.target.value)"
              :readonly="isUserAddress"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CartDelivery",
  props: {
    delivery: String,
    address: Object,
    phone: String,
  },
  computed: {
    ...mapState("Auth", {
      addresses: "addresses",
    }),
    isUserAddress() {
      return this.delivery !== "1" && this.delivery !== "2";
    },
  },
  methods: {
    selectAddress(val) {
      this.$emit("selectAddress", val);
    },
    changeAddress(field, val) {
      this.$emit("changeAddress", { field, val });
    },
  },
};
</script>
