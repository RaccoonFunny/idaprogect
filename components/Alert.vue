<template>
<div :class="$style.alert">
  <span>{{messageHeader}}</span>
  <p>{{subMessage}}</p>
</div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    messageHeader: String,
    subMessage: String
  },
  mounted() {
    setTimeout(()=>{
      this.$emit("close")
    }, 3000)
  }
}
</script>

<style module lang="scss">
  .alert {
    height: 100px;
    padding: 25px;
    width: 500px;
    background: #FFFFFF;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    position: absolute;
    right: calc(50vw - 275px);
    top: calc( 50vh - 75px);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: fade;

    span {
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 41px;
      color: #000000;
    };

    p {
      font-style: normal;
      font-weight: normal;
      font-size: 22px;
      line-height: 28px;
      color: #000000;
      margin-bottom: 15px;
    };
  }
</style>
