<!--
 * @Descripttion: 
 * @Author: voanit
 * @Date: 2022-05-13 17:02:10
 * @LastEditors: voanit
 * @LastEditTime: 2022-05-13 17:46:05
-->
<template>
  <a
    class="npm-badge"
    :href="badgeLink"
    :title="packageName"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img :src="badgeImg" :alt="packageName" />
  </a>
</template>

<script>
export default {
props: {
  packageName: {
    type: String,
    required: true,
  },
  distTag: {
    type: String,
    required: false,
    default: 'next',
  },
},

computed: {
  badgeLink(){
    return `https://www.npmjs.com/package/${this.packageName}`
  },
  badgeLabel() {
    console.log(this.distTag, 'this.distTag');
    if (this.distTag) {
    return `${this.packageName}@${this.distTag}`
  }

  return this.packageName
  },
  badgeImg() {
    console.log(encodeURIComponent(this.badgeLabel), 'encodeURIComponent(this.badgeLabel)');
    return `https://badgen.net/npm/v/${this.packageName}/${
      this.distTag
    }?label=${encodeURIComponent(this.badgeLabel)}`
  }
}
}

</script>
<style scoped>
  .npm-badge {
  margin-right: 0.5rem;
}
</style>