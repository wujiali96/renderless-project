<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>
<script>
import customAxiosInstance from "@/api/common-axios/customAxiosInstance"
import customFetchInstance from "@/api/common-axios/customFetchInstance"
export default {
  mounted() {
    
    
const testCustomAxios = async () => {
    try{
        const response = await customAxiosInstance.request({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/todos/1"
        })
        console.log("axios response:", response.data);
    }catch(error) {
        console.error("axios error:", error)
    }
}

const testCustomFetch = async () => {
    try{
        const response = await customFetchInstance.request({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/todos/1"
        })
        const data = await response.json()
        console.log("fetch response:", data);
    }catch(error) {
        console.error("fetch error:", error)
    }
}

for(let i = 0; i< 10; i++) {
    testCustomAxios()
    testCustomFetch()
}

   alert("正在打印测试请求，F12查看")


  },
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
