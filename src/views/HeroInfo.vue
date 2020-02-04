<template>
  <div class="HeroInfo">
    <iframe :src="infoSrc" frameborder="0" border="0" id="infoSrc"></iframe>
  </div>
</template>
<script>
  export default {
    name:'HeroInfo',
    data(){
      return{
        infoSrc:'',
        HeroInfo:this.$store.state.HeroInfo,
        OhterInfo:[]
      }
    },
    mounted(){
      this.HeroInfo.forEach((value)=>{
        if(this.$route.params.id == value.ename){
          console.log(this.$route.params.id == value.ename)
          this.infoSrc = 'https://pvp.qq.com/web201605/herodetail/m/'+this.$route.params.id+'.html'
          let css = document.createElement('link');
          css.href = 'http://ssl.w4ctech.cn/css/global.css';
          css.rel = 'stylesheet';
          css.type = 'text/css';
          document.head.appendChild(css);
        }else{
          this.OhterInfo.push(value)
        }
      })
      if(this.OhterInfo.length == this.HeroInfo.length || location.pathname == '/HeroInfo/'){
        this.GoHome()
      }
    },
    methods:{
      GoHome(){
        this.$message({
          message: '找不到这个页面，3秒后跳转到首页',
          type: 'warning'
        });
        setTimeout(()=>{
          this.$router.push({ path: '/' })
        },1000)
        setTimeout(()=>{
          this.$message.closeAll()
        },1000)
      },
    },
    destroyed() {
      let links = document.getElementsByTagName("link");
      links.forEach((e)=>{
        if(e.href == 'http://ssl.w4ctech.cn/css/global.css'){
          e.href = ''
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  .HeroInfo{
    width: 100%;
    height: 100%;
    iframe{
      width: 100%;
      height: 100%;
    }
  }
</style>
