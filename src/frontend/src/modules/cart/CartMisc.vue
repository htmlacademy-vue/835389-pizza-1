<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li v-for="el in misc" :key="el.id" class="additional-list__item sheet">
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
              @click="changeMisc(el.id, el.qty - 1)"
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
                counter__button counter__button--plus counter__button--orange
              "
              @click="changeMisc(el.id, el.qty + 1)"
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
    changeMisc(id, qty) {
      if (qty >= 0) {
        this.$store.dispatch("Cart/changeMisc", { id, qty });
      }
    },
  },
};
</script>
