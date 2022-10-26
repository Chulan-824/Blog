<template>
  <div class="sideTitle">
    <div class="title">{{ page.title }}</div>
    <hr />
    <ul v-if="page.headers">
      <li
        :class="{ check: item.check, [`level-${item.level}`]: true }"
        v-for="item in sideTitleArray"
        :key="item.title"
        @click="handleClick(item)"
      >
        <router-link
          :to="`${$route.path}#${item.title
            .replace(/\s|\.|\“|\”/g, '-')
            .toLowerCase()}`"
          >{{ item.title }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      require: true,
    },
  },

  data() {
    return {
      sideTitleArray: [...this.page.headers],
    }
  },

  // mounted() {
  //   console.log(this.page);
  // },

  methods: {
    handleClick(item) {
      this.sideTitleArray = this.sideTitleArray.map((el) => {
        if (el.title === item.title) {
          el.check = true
        } else {
          el.check = false
        }
        return el
      })
    },
  },
}
</script>
<style scoped lang="stylus">
.sideTitle {
  position: fixed;
  top: 69px;
  right: 20px;
  padding: 16px;
  width: 245px;
  background-color: #fff;
  .title {
    text-align: center;
    font-weight: bold;
  }
}
hr {
  border: 0;
  border-top: 1px solid rgb(234 236 239);
  margin-top: 0.5rem;
}

a {
  font-size: 14px;
  color: rgb(44 62 80);
}

a:hover{
  color: rgb(62 175 124);
  text-decoration: none !important;
}

.level-1 {
  margin-left .4rem
}
.level-2 {
  margin-left 1rem
}
.level-3 {
  margin-left 2.2rem
  list-style-type: circle
}

.check{
  color: rgb(62 175 124);
}
.check a{
  color: rgb(62 175 124);
}
</style>
