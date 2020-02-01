<template>
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <el-table
            :data="HeroData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
          <el-table-column
              label="英雄缩列图"
              width="200">
            <template slot-scope="scope">
              <img class="imgStyle" preview :preview-text="scope.row.title + scope.row.cname" :src="'/static/'+scope.row.ename+'/'+scope.row.ename+'-bigskin-1.jpg'" :title="scope.row.title + scope.row.cname">
            </template>
          </el-table-column>
          <el-table-column
              prop="cname"
              label="英雄姓名"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              prop="title"
              label="伴生皮肤"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              prop="skin_name"
              label="所有皮肤"
              sortable>
          </el-table-column>
          <el-table-column
                fixed="right"
                label="操作"
                width="100">
            <template slot-scope="scope">
              <el-button  @click="handleClick(scope.row.ename)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
  export default {
  name: 'home',
  data(){
    return{
      HeroData:[],
      Imgurl:''
    }
  },
  mounted() {
    this.$http.get(this.$api.Hero.List,true).then((result) => {
     this.HeroData = result
    })
  },
  methods:{
    handleClick(row) {
      this.$http.get(this.$api.Hero.detail+row+'.html',true).then((result) => {
        console.log(result)
      })
    },

  }
}
</script>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .imgStyle{
      width: 60px;
      height: 60px;
  }
</style>
