<template>
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item prop="schoolName">
				<el-input v-model="state.queryForm.schoolName" placeholder="学校名称"></el-input>
			</el-form-item>
			<el-form-item prop="abbreviate">
				<el-input v-model="state.queryForm.schoolAbbreviate" placeholder="学校简称"></el-input>
			</el-form-item>
			<el-form-item prop="enabled">
				<el-select v-model="state.queryForm.enabled" placeholder="是否可用" clearable>
					<el-option label="可用" :value="1" />
					<el-option label="停用" :value="0" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button icon="Search" type="primary" @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button icon="RefreshRight" @click="reset(queryRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>

	<el-card>
		<el-space>
			<el-space>
				<el-button icon="Plus" type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-space>
		</el-space>

		<el-table v-loading="state.dataListLoading" :data="state.dataList" border class="layout-table">
			<el-table-column prop="id" label="id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="schoolId" label="学校Id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="schoolName" label="学校名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="schoolAbbreviate" label="学校简称" header-align="center" align="center"></el-table-column>

			<el-table-column prop="name" label="校区名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="longitude" label="校区经度" header-align="center" align="center"></el-table-column>
			<el-table-column prop="latitude" label="校区纬度" header-align="center" align="center"></el-table-column>

			<el-table-column label="是否可用" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.enabled ? '可用' : '停用' }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column prop="createTime" label="创建时间" header-align="center" align="center" width="180"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="200">
				<template #default="scope">
					<el-button type="primary" link @click="addOrUpdateHandle(scope.row.id)">编辑</el-button>
					<el-button type="primary" link @click="onEnableDisable(scope.row.id, !scope.row.enabled)">{{
						scope.row.enabled ? '禁用' : '启用'
					}}</el-button>
					<el-button type="primary" link @click="onDeleteById(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			:current-page="state.page"
			:page-sizes="state.pageSizes"
			:page-size="state.limit"
			:total="state.total"
			layout="total, sizes, prev, pager, next, jumper"
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
		>
		</el-pagination>

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>
	</el-card>
</template>

<script setup lang="ts" name="SysRoleIndex">
import { useCrud } from '@/hooks/curd'
import { reactive, ref } from 'vue'
import AddOrUpdate from './add-or-update.vue'
import { IHooksOptions } from '@/hooks/interface'

const state: IHooksOptions = reactive({
	dataListUrl: '/campus/list',
	deleteUrl: '/campus/deleteById',
	enableDisableUrl: '/campus/updateStatus',
	queryForm: {
		name: ''
	}
})

const { getDataList, onEnableDisable, sizeChangeHandle, currentChangeHandle, onDeleteById, reset } = useCrud(state)

const queryRef = ref()
const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}
</script>

<style scoped>
.el-dropdown-link {
	display: flex;
	align-items: center;
	line-height: normal;
	margin-left: 10px;
}
</style>
