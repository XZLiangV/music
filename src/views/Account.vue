<template>
    <transition appear>
        <div class="account">
            <AccountHeader @switchItem="switchItem"></AccountHeader>
            <AccountBottom :switchNum="switchNum"></AccountBottom>
        </div>
    </transition>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader'
import AccountBottom from '../components/Account/AccountBottom'
export default {
  name: 'Account',
  components: {
    AccountHeader,
    AccountBottom
  },
  methods: {
    switchItem (num) {
      this.switchNum = num
    }
  },
  data () {
    return {
      switchNum: 0
    }
  }
}
</script>

<style scoped lang="scss">
.account{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // background: #f00;
}
.v-enter{
    transform: translateX(100%);
}
.v-enter-to{
    transform: translateX(0);
}
.v-enter-active{
    transition: transform .8s;
}
.v-leave{
    transform: translateX(0);
}
.v-leave-to{
    transform: translateX(100%);
}
.v-leave-active{
    transition: transform .8s;
}
</style>
