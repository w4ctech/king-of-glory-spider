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
        infoSrc:''
      }
    },
    mounted(){
      let param = this.$route.path.replace(/[^0-9]/ig,"");
      this.infoSrc = 'https://pvp.qq.com/web201605/herodetail/m/'+param+'.html'
      if(Number(param)){
        let css = document.createElement('link');
        css.href = 'http://ssl.w4ctech.cn/css/global.css';
        css.rel = 'stylesheet';
        css.type = 'text/css';
        document.head.appendChild(css);
        console.log(param)
      }
      let iframeObj = document.getElementById("infoSrc").contentWindow.document
      console.log(iframeObj,'...................iframeObj' )
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
