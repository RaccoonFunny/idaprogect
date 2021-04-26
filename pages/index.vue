<template>
  <div :class="[$style.shopArea]">
    <div :class="[$style.sidebar]">
        <span>
          Каталог
        </span>
      <ul>
        <li v-for="good in shopGoodsTitle">
          <nuxt-link :active-class="$style.lnkActive" :class="[$style.lnk]" :to="'' + good.id">{{
              good.name
            }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <Nuxt/>
  </div>

</template>

<script>
export default {
  name: "index",
  async fetch(ctx) {
    await ctx.store.dispatch('shopGoods/fetch');
  },
  computed: {
    shopGoodsTitle() {
      return this.$store.getters["shopGoods/getShopGoodsTitle"]
    },
  },
}
</script>

<style module lang="scss">

.shopArea {
  display: flex;

  .sidebar {
    width: 248px;
    padding: 32px 0 0 88px;

    ul {
      margin: 30px 0 0;
    }

    li {
      list-style-type: none;

      &:nth-child(even) {
        margin: 16px 0;
      }
    }

    span {
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 41px;
      color: #1F1F1F;
    }

    .lnk {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 21px;
      text-decoration: none;

      &:hover {
        color: #59606D;
      }

      color: #959DAD;
    }

    .lnkActive {

      color: #1F1F1F;
      text-decoration-line: underline;
    }
  }
}
</style>
