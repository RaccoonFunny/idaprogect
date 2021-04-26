<template>
  <div
    :class="[{ [$style.open]: open }, $style.customSelect]"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div :class="[{ [$style.open]: open}, $style.selected]" @click="open = !open">
      {{ selected }}
    </div>
    <div :class="[{ [$style.selectHide]: !open }, $style.items]">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
          ? this.options[0]
          : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>

<style lang="scss" module>
.customSelect {
  position: relative;
  width: 180px;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;

  .selected {
    color: #59606D;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;

    &.open:after {
      transform: rotate(540deg);
      transition: 1500ms ease;
    }

    &:after {
      position: absolute;
      content: "";
      top: 16px;
      right: 1em;
      width: 0;
      height: 0;
      border: 5px solid;
      border-color: transparent transparent #59606D transparent;
      transition: 500ms ease;
    }
  }

  .items {
    transition: 1s ease;
    padding: 20px 0;
    color: #1F1F1F;
    border-radius: 8px;
    overflow: hidden;
    position: absolute;
    background-color: #0a0a0a;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    left: 0;
    right: 0;
    z-index: 1;

    div {
      color: #959DAD;
      padding-left: 1em;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: #F8F8F8;
        color: #1F1F1F;
      }
    }
  }
}
.selectHide {
  transform: scaleY(0);
  transition: 1s ease-out;
  transform-origin: top;
}
</style>
