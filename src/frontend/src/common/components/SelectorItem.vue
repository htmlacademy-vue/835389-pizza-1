<template>
  <span
    class="filling"
    :class="`filling--${item.value}`"
    :draggable="isDraggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    {{ item.name }}
  </span>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "../constants";
export default {
  name: "SelectorItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    isDraggable() {
      return !this.item.count || (this.item.count && this.item.count < 3);
    },
  },
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(DATA_TRANSFER_PAYLOAD, JSON.stringify(this.item));
    },
  },
};
</script>
