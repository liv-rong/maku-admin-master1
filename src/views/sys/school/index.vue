<template>
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item prop="name">
				<el-input v-model="state.queryForm.name" placeholder="学校名称"></el-input>
			</el-form-item>
			<el-form-item prop="abbreviate">
				<el-input v-model="state.queryForm.abbreviate" placeholder="学校简称"></el-input>
			</el-form-item>
			<el-form-item prop="auditIt">
				<el-select v-model="state.queryForm.auditIt" placeholder="是否审核" clearable>
					<el-option label="已审核" :value="true" />
					<el-option label="未审核" :value="false" />
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
			<el-table-column prop="schoolNo" label="编号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="name" label="学校名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="abbreviate" label="学校简称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="pic" label="图标" header-align="center" align="center">
				<template #default="scope">
					<el-image :src="scope.row.auditIt" />
				</template>
			</el-table-column>
			<el-table-column label="审核状态" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.auditIt ? '已审核' : '未审核' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="emailSuffix" label="邮箱后缀" header-align="center" align="center"></el-table-column>
			<el-table-column label="启用状态" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.enabled ? '启用' : '禁用' }}</el-tag>
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
import { reactive, ref } from 'vue'
import AddOrUpdate from './add-or-update.vue'
import { IHooksOptions } from '@/hooks/interface'
import { useCrud } from '../../../hooks/curd'

const state: IHooksOptions = reactive({
	dataListUrl: '/school/list',
	deleteUrl: '/school/deleteById',
	enableDisableUrl: '/school/updateStatus',
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
