<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content bg-purple"><el-button type="primary" @click="info('hero')">英雄</el-button></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><el-button type="primary" @click="info('equip')">装备</el-button></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><el-button type="primary" @click="info('inscription')">铭文</el-button></div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          :data="HeroData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          class="hero-table"
          v-if="TabInfo == 'hero'"
        >
          <el-table-column
              label="英雄缩列图"
              width="320">
            <template slot-scope="scope">
              <img class="imgStyle" preview :preview-text="scope.row.title + scope.row.cname" :src="'/heroImg/'+scope.row.ename+'/'+scope.row.ename+'-bigskin-1.jpg'" :title="scope.row.title + scope.row.cname">
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
              width="160">
            <template slot-scope="scope">
              <el-button  @click="handleClick(scope.row.ename)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table
            :data="EquipData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            class="equip-table"
            v-if="TabInfo == 'equip'"
          >
          <el-table-column
              label="装备缩列图"
              width="320">
            <template slot-scope="scope">
              <img class="imgStyle" preview :preview-text="scope.row.item_name" :src="'/equipImg/itemimg/'+scope.row.item_id+'.jpg'" :title="scope.row.item_name">
            </template>
          </el-table-column>
          <el-table-column
              prop="item_name"
              label="装备名称"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              label="装备属性">
            <template slot-scope="scope">
              <span v-html="scope.row.des1"></span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
            :data="InscriptionData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            class="inscription-table"
            v-if="TabInfo == 'inscription'"
        >
          <el-table-column
              label="铭文缩列图"
              width="320">
            <template slot-scope="scope">
              <img class="imgStyle" preview :preview-text="scope.row.ming_name" :src="'/equipImg/mingwen/'+scope.row.ming_id+'.png'" :title="scope.row.ming_name">
            </template>
          </el-table-column>
          <el-table-column
              prop="ming_name"
              label="铭文名"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              label="铭文属性"
              width="180">
            <template slot-scope="scope">
              <span v-html="scope.row.ming_des"></span>
            </template>
          </el-table-column>
          <el-table-column
              prop="ming_grade"
              label="铭文等级"
              sortable>
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
      EquipData:[],
      InscriptionData:[],
      TabInfo:'hero'
    }
  },
  mounted() {
    this.bus.$emit('loading', true,'加载英雄列表中');
    this.$http.get(this.$api.Hero.List,true).then((result) => {
      this.bus.$emit('loading', false);
      this.HeroData = result
    })
  },
  methods:{
    info(e){
      this.TabInfo = e
      switch (e) {
        case 'hero':
          this.bus.$emit('loading', true,'加载英雄列表中');
          this.$http.get(this.$api.Hero.List,true).then((result) => {
            this.HeroData = result
            this.bus.$emit('loading', false);
          })
          break
        case 'equip':
          this.bus.$emit('loading', true,'加载装备列表中');
          this.$http.get(this.$api.Hero.Equip,true).then((result) => {
            this.EquipData = result
            this.bus.$emit('loading', false);
          })
          break
        case 'inscription':
          this.bus.$emit('loading', true,'加载铭文列表中');
          this.$http.get(this.$api.Hero.Inscription,true).then((result) => {
            this.InscriptionData = result
            this.bus.$emit('loading', false);
          })
          break
        default:
          return e
      }
    },
    handleClick(row) {
      this.$http.get(this.$api.Hero.detail+row+'.html',true).then((result) => {
        console.log(result)
      })
    },

  }
}
</script>
<style lang="scss" scoped>
  .el-header .el-footer {
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
  .hero-table{
    text-align: center;
  }
  .hero-table{
    .imgStyle{
      width: 200px;
      height: 130px;
    }
  }
  .equip-table-table{
    .imgStyle{
      width: 6px;
      height: 60px;
    }
  }
  .inscription-table{
    .imgStyle{
      width: 60px;
      height: 60px;
    }
  }
</style>
<style lang="scss" scoped>
  .hero-table /deep/ .has-gutter tr th , .hero-table /deep/ .el-table__row td , .hero-table /deep/ .el-table__row tr th{
    text-align: center;
  }

  .equip-table /deep/ .has-gutter tr th , .equip-table /deep/ .el-table__row td , .equip-table /deep/ .el-table__row tr th{
    text-align: center;
  }

  .inscription-table /deep/ .has-gutter tr th , .inscription-table /deep/ .el-table__row td , .inscription-table /deep/ .el-table__row tr th{
    text-align: center;
  }
</style>
