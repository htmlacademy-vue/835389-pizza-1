<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div class="sheet__content dough">
              <label
                v-for="(item, i) in dough"
                :key="item.id"
                class="dough__input"
                :class="`dough__input--${item.value}`"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="item.value"
                  :checked="i === 0"
                  class="visually-hidden"
                />
                <b>{{ item.name }}</b>
                <span>{{ item.description }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>
            <div class="sheet__content diameter">
              <label
                v-for="(size, i) in sizes"
                :key="size.id"
                class="diameter__input"
                :class="`diameter__input--${size.value}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="size.value"
                  :checked="i === 0"
                  class="visually-hidden"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>
            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>
                <label
                  v-for="(sauce, i) in sauces"
                  :key="sauce.id"
                  class="radio ingredients__input"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="sauce.value"
                    :checked="i === 0"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>
              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="ingredient in ingredients"
                    :key="ingredient.id"
                    class="ingredients__item"
                  >
                    <span
                      class="filling"
                      :class="`filling--${ingredient.value}`"
                    >
                      {{ ingredient.name }}
                    </span>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "../static/pizza.json";
import user from "../static/user.json";
import misc from "../static/misc.json";
import { PIZZA_DOUGH } from "../common/constants";
import { PIZZA_INGREDIENTS } from "../common/constants";
import { PIZZA_SAUSES } from "../common/constants";
import { PIZZA_SIZES } from "../common/constants";
import { normalizePizza } from "../common/helpers";
export default {
  name: "Index",
  data() {
    return {
      pizza: pizza,
      user: user,
      misc: misc,
    };
  },
  computed: {
    dough() {
      return this.pizza.dough.map((item) => normalizePizza(item, PIZZA_DOUGH));
    },
    ingredients() {
      return this.pizza.ingredients.map((item) =>
        normalizePizza(item, PIZZA_INGREDIENTS)
      );
    },
    sauces() {
      return this.pizza.sauces.map((item) =>
        normalizePizza(item, PIZZA_SAUSES)
      );
    },
    sizes() {
      return this.pizza.sizes.map((item) => normalizePizza(item, PIZZA_SIZES));
    },
  },
};
</script>
