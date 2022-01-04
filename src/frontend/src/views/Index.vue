<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector />
        <BuilderSizeSelector />
        <BuilderIngredientsSelector />
        <BuilderPizzaView />
      </div>
    </form>
  </main>
</template>

<script>
import { mapState } from "vuex";
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";

export default {
  name: "Index",
  computed: {
    ...mapState("Builder", {
      pizza: "pizza",
      currentPizza: "currentPizza",
    }),
  },
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
};
</script>
