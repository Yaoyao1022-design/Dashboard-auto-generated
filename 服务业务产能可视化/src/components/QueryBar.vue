<template>
  <el-form class="query-bar" :inline="true" @submit.native.prevent>
    <el-form-item label="查看端">
      <el-radio-group :value="store.viewMode" size="small" @input="actions.setViewMode">
        <el-radio-button label="admin">管理端</el-radio-button>
        <el-radio-button label="site">网点端</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="查询日期">
      <el-date-picker
        v-model="store.queryDate"
        type="date"
        size="small"
        placeholder="请选择"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        clearable
      />
    </el-form-item>
    <el-form-item label="时间段">
      <el-select v-model="store.timeSlot" size="small" placeholder="请选择">
        <el-option
          v-for="item in timeSlotOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="省区">
      <el-select :value="store.province" clearable placeholder="请选择" size="small" @input="actions.setProvince">
        <el-option v-for="item in provinces" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="网点">
      <el-select :value="store.site" clearable placeholder="请选择" size="small" @input="actions.setSite">
        <el-option v-for="item in sites" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="二级地址">
      <el-select :value="store.addr1" clearable placeholder="请选择" size="small" @input="actions.setAddr1">
        <el-option v-for="item in addr1List" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="四级地址">
      <el-select v-model="store.addr2" clearable placeholder="请选择" size="small">
        <el-option v-for="item in addr2List" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="产品线">
      <el-select :value="store.productLine" clearable placeholder="请选择" size="small" @input="actions.setProductLine">
        <el-option
          v-for="item in productLines"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="一级资质">
      <el-select :value="store.qual1" clearable placeholder="请选择" size="small" @input="actions.setQual1">
        <el-option
          v-for="item in qual1List"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="二级资质">
      <el-select v-model="store.qual2" clearable placeholder="请选择" size="small">
        <el-option
          v-for="item in qual2List"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="工程师属性">
      <el-select v-model="store.workerType" size="small">
        <el-option
          v-for="item in workerTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="主辅资质">
      <el-select v-model="store.qualRole" size="small">
        <el-option
          v-for="item in qualRoleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button size="small" @click="actions.resetFilter">重置</el-button>
      <el-button type="primary" size="small" @click="actions.query">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { store, actions } from '@/store'
import {
  timeSlotOptions,
  workerTypeOptions,
  qualRoleOptions,
  productLines,
  visibleProvinces,
  visibleSites,
  visibleAddr1,
  visibleAddr2,
  visibleQual1,
  visibleQual2
} from '@/mock/capacity'

export default {
  name: 'QueryBar',
  data() {
    return {
      store,
      actions,
      timeSlotOptions,
      workerTypeOptions,
      qualRoleOptions,
      productLines
    }
  },
  computed: {
    provinces() {
      return visibleProvinces()
    },
    sites() {
      return visibleSites()
    },
    addr1List() {
      return visibleAddr1()
    },
    addr2List() {
      return visibleAddr2()
    },
    qual1List() {
      return visibleQual1()
    },
    qual2List() {
      return visibleQual2()
    }
  }
}
</script>

<style scoped>
.query-bar {
  background: var(--white);
  border-radius: var(--radius);
  padding: 12px 12px 0;
  margin-bottom: 12px;
}
.query-bar >>> .el-form-item {
  margin-bottom: 12px;
}
</style>
