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
      <el-main v-if="TabInfo == 'hero'">
        <span class="count">共获取到{{HeroData.length}}个英雄信息</span>
        <el-table
          :data="HeroTable"
          :default-sort = "{prop: 'date', order: 'descending'}"
          style="width: 100%"
          class="hero-table">
          <el-table-column
            label="英雄缩列图">
            <template slot-scope="HeroData">
              <img class="imgStyle" preview onerror="this.src='https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=29962016,3519493871&fm=74&app=80&f=JPEG&size=f121,121?sec=1880279984&t=4da21179420b821182155a587a4a42db'"  :preview-text="HeroData.row.title + HeroData.row.cname" :src="'/heroImg/'+HeroData.row.ename+'/'+HeroData.row.ename+'-bigskin-1.jpg'" :title="HeroData.row.title + HeroData.row.cname">
            </template>
          </el-table-column>
          <el-table-column
            prop="cname"
            label="英雄姓名"
            sortable>
          </el-table-column>
          <el-table-column
            prop="title"
            label="伴生皮肤"
            sortable>
          </el-table-column>
          <el-table-column
            prop="skin_name"
            label="所有皮肤"
            sortable>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="HeroData">
              <el-button  @click="handleClick(HeroData.row.ename)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            class="Tab-pagination"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="HeroData.length">
        </el-pagination>
      </el-main>
      <el-main v-if="TabInfo == 'equip'">
        <span class="count">共获取到{{EquipData.length}}件装备信息</span>
        <el-table
          :data="equipTable"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          class="equip-table">
          <el-table-column
            label="装备缩列图">
            <template slot-scope="EquipData">
              <img class="imgStyle" preview onerror="this.src='https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=29962016,3519493871&fm=74&app=80&f=JPEG&size=f121,121?sec=1880279984&t=4da21179420b821182155a587a4a42db'"  :preview-text="EquipData.row.item_name" :src="'/equipImg/itemimg/'+EquipData.row.item_id+'.jpg'" :title="EquipData.row.item_name">
            </template>
          </el-table-column>
          <el-table-column
            prop="item_name"
            label="装备名称"
            sortable>
          </el-table-column>
          <el-table-column
            label="装备属性">
            <template slot-scope="EquipData">
              <span v-html="EquipData.row.des1"></span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="Tab-pagination"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="EquipData.length">
        </el-pagination
                >
      </el-main>
      <el-main v-if="TabInfo == 'inscription'">
        <span class="count">获取到{{InscriptionData.length}}个铭文信息</span>
        <el-table
          :data="InscriptionTable"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          class="inscription-table">
          <el-table-column
            label="铭文缩列图">
            <template slot-scope="scope">
              <img class="imgStyle" preview onerror="this.src='https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=29962016,3519493871&fm=74&app=80&f=JPEG&size=f121,121?sec=1880279984&t=4da21179420b821182155a587a4a42db'"  :preview-text="scope.row.ming_grade+'级铭文:'+scope.row.ming_name" :src="'/equipImg/mingwen/'+scope.row.ming_id+'.png'" :title="scope.row.ming_grade+'级铭文:'+scope.row.ming_name">
            </template>
          </el-table-column>
          <el-table-column
            prop="ming_name"
            label="铭文名"
            sortable>
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
        <el-pagination
            class="Tab-pagination"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="InscriptionData.length">
        </el-pagination>
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
      pageSize: 5,
      currentPage:1,
      HeroData:[],
      EquipData:[],
      InscriptionData:[],
      TabInfo:'hero'
    }
  },
  computed: {
    HeroTable() {
      return this.HeroData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    equipTable(){
      return this.EquipData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    InscriptionTable(){
      return this.InscriptionData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
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
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
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
    padding-bottom: 0;
    .count{
      margin-bottom: 20px;
      display: block;
    }
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
      cursor: pointer;
    }
  }
  .equip-table{
    .imgStyle{
      width: 60px;
      height: 60px;
      cursor: pointer;
    }
  }
  .inscription-table{
    .imgStyle{
      width: 60px;
      height: 60px;
      cursor: pointer;
    }
  }
  .Tab-pagination{
    margin: 20px;
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
