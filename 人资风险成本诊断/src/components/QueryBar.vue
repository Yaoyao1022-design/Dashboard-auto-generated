<template>
  <el-form class="query-bar" :inline="true" @submit.native.prevent>
    <el-form-item label="组织层级">
      <el-radio-group :value="store.orgLevel" size="small" @input="actions.setOrgLevel">
        <el-radio-button
          v-for="item in orgLevels"
          :key="item.value"
          :label="item.value"
        >{{ item.label }}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="showLine" label="条线">
      <el-select v-model="store.line" clearable placeholder="请选择" size="small">
        <el-option v-for="item in businessLines" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="showProvince" label="省区">
      <el-select v-model="store.province" clearable placeholder="请选择" size="small">
        <el-option v-for="item in provinces" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="showC1Dept" label="一级部门">
      <el-select v-model="store.c1Dept" clearable placeholder="请选择" size="small">
        <el-option v-for="item in c1Departments" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="月">
      <el-date-picker
        v-model="store.timeRange"
        type="month"
        size="small"
        placeholder="请选择"
        format="yyyy年MM月"
        value-format="yyyy-MM-01"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button size="small" @click="actions.resetFilter">重置</el-button>
      <el-button type="primary" size="small" @click="actions.query">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { store, actions } from '@/store'
import { orgLevels, provinces, businessLines, c1Departments } from '@/mock/labor'

export default {
  name: 'QueryBar',
  data() {
    return {
      store,
      actions,
      orgLevels,
      provinces,
      businessLines,
      c1Departments
    }
  },
  computed: {
    showLine() {
      return this.store.orgLevel === 'line'
    },
    showProvince() {
      return this.store.orgLevel === 'province' || this.store.orgLevel === 'line'
    },
    showC1Dept() {
      return this.store.orgLevel === 'c1'
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
