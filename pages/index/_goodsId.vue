<template>
  <div :class="$style.goods">
    <div :class="$style.sort">
      <span>Сортировать по:</span>
      <SelectUi
        :options="['По цене', 'По популярности']"
        :default="'По популярности'"
        class="select"
        @input="displayToKey($event)"
      />
    </div>
    <div :class="$style.shopItems">
      <item v-for="good in goods" :key="good.id" :good="good"></item>
    </div>
  </div>
</template>
<script>
import item from "~/components/Item";

export default {
  async asyncData(ctx) {
    let goods = ctx.store.getters["shopGoods/getShopGoods"](ctx.route.params.goodsId)
    if (!goods){
      goods = await ctx.$axios.$get("https://frontend-test.idaproject.com/api/product?category=" + ctx.route.params.goodsId);
      goods = goods.sort((a, b) => {
        return a['rating'] > b['rating'] ? 1 : -1;
      }).reverse()
      await ctx.store.dispatch("shopGoods/downloadShopGoods", goods);
    }
    return {goods}
  },
  name: "goods",
  watch: {
    sortBy: function () {
      this.$store.dispatch("shopGoods/changeSortType", [this.sortBy, this.$route.params.goodsId])
    },
  },
  data: function () {
    return {
      goods: [],
      sortBy: "rating"
    }
  },
  methods: {
    displayToKey: function (e) {
      switch (e) {
        case 'По популярности':
          this.sortBy = 'rating'
          break;
        case  'По цене':
          this.sortBy = 'price'
      }
    }
  }
}
</script>

<style module lang="scss">

.goods {
  width: 100%;

  .sort {
    display: flex;
    align-content: center;
    align-items: center;
    height: 100px;
    justify-content: flex-end;
    margin: 0 150px 0 0;


    select {
      border: none;
      background-image: url("data:image/svg+xml,%3Csvg width='5' height='3' viewBox='0 0 5 3' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0H0L2.5 2.5L5 0Z' fill='%2359606D'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background-position: right 0 top 50%;
      width: 115px;
      position: relative;

      &:focus {
        &::before {
          content: "";
          background: url("data:image/svg+xml,%3Csvg width='5' height='3' viewBox='0 0 5 3' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0H0L2.5 2.5L5 0Z' fill='%2359606D'/%3E%3C/svg%3E%0A") 0 0 repeat;
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          z-index: -1;
          background: red;
          //transform: rotate(-90deg);
          //transition: 2s ease;
        }
      }
    }

    span {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 21px;

      /* identical to box height */
      display: flex;
      align-items: flex-end;

      /* black */
      color: #1F1F1F;
    }
  }

  .shopItems {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
