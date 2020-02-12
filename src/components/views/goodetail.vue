<template>
    <div class="good_detail">
        <img :src="item" v-for='(item,i) in arr' :key=i />
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props:['arr'],
}
</script>
<style lang="stylus" scoped>
.good_detail
  width 8.73rem /* 655/75 */
  margin 0.35rem /* 26/75 */ auto 0
  padding-bottom: .53rem /* 40/75 */
  img
    width 8.73rem /* 655/75 */
</style>