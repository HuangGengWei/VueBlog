<template>
  <div id="app" v-cloak>
    <!-- <transition :name="transitionName"> -->
        <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    include: []
  }),
  watch: {//使用watch 监听$router的变化
    // $route(to, from) {
    //   //如果to索引大于from索引,判断为前进状态,反之则为后退状态
    //   console.log('to.meta.index',to.meta.index,'from.meta.index',from.meta.index)
    //   if(to.meta.index > from.meta.index){
	  //   //设置动画名称
    //     this.transitionName = 'slide-left';
    //   }else{
    //     this.transitionName = 'slide-right';
    //   }
    // }
    // $route(to, from) {
    //   console.log('要去的页面',to,'从哪里来',from,'include',this.include)
    //   //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
    //   if (to.meta.keepAlive) {
    //     !this.include.includes(to.name) && this.include.push(to.name);
    //   }
    //   console.log('刷新后的include',this.include)
    //   //如果 要 form(离开) 的页面是 keepAlive缓存的，
    //   //再根据 deepth 来判断是前进还是后退
    //   //如果是后退
    //   if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
    //     var index = this.include.indexOf(from.name);
    //     index !== -1 && this.include.splice(index, 1);
    //   }
    // }
  }
}
</script>

<style>
  [v-cloak] {
   display: none;
  }

/* .slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
} */
</style>