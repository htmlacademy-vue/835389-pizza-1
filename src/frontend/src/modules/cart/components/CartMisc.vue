<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="el in misc"
        :key="el.id"
        class="additional-list__item sheet"
        data-test="misc-item"
      >
        <p class="additional-list__description">
          <img
            :src="el.image"
            width="39"
            height="60"
            :alt="el.name"
            data-test="misc-image"
          />
          <span data-test="misc-name">{{ el.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
              :disabled="el.qty < 1"
              data-test="misc-button-minus"
              @click="changeMisc(el.id, 'decrement')"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              :value="el.qty"
              readonly
              data-test="misc-counter"
            />
            <button
              type="button"
              class="
                counter__button counter__button--plus counter__button--orange
              "
              data-test="misc-button-plus"
              @click="changeMisc(el.id, 'increment')"
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b data-test="misc-price">× {{ el.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CartMisc",

  computed: {
    ...mapState("Cart", {
      misc: "misc",
    }),
  },

  methods: {
    changeMisc(id, action) {
      if (this.misc.find((el) => el.id === id).qty >= 0) {
        this.$store.dispatch("Cart/changeMisc", { id, action });
      }
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/additional-list";
</style>
