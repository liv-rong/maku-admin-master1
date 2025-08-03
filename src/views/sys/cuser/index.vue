<template>
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item prop="id">
				<el-input v-model="state.queryForm.id" placeholder="id"></el-input>
			</el-form-item>
			<el-form-item prop="username">
				<el-input v-model="state.queryForm.username" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item prop="schoolName">
				<el-input v-model="state.queryForm.schoolName" placeholder="学校名称"></el-input>
			</el-form-item>
			<el-form-item prop="campusName">
				<el-input v-model="state.queryForm.campusName" placeholder="校区名称"></el-input>
			</el-form-item>

			<el-form-item prop="sex">
				<el-select v-model="state.queryForm.sex" placeholder="性别" clearable>
					<el-option label="男" :value="1" />
					<el-option label="女" :value="2" />
				</el-select>
			</el-form-item>

			<el-form-item prop="startTime">
				<el-date-picker v-model="state.queryForm.startTime" type="date" placeholder="入学时间" />
			</el-form-item>

			<el-form-item prop="authStatus">
				<el-select v-model="state.queryForm.authStatus" placeholder="认证状态" clearable>
					<el-option label="未认证" :value="0" />
					<el-option label="银认证" :value="1" />
					<el-option label="金认证" :value="2" />
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
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border class="layout-table">
			<el-table-column prop="id" label="id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="openId" label="微信小程序用户唯一标识" header-align="center" align="center"></el-table-column>
			<el-table-column prop="unionId" label="微信小程序用户在开放平台的唯一标识符" header-align="center" align="center"></el-table-column>
			<el-table-column prop="schoolId" label="学校id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="campusId" label="校区id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="username" label="账号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="realName" label="真实姓名" header-align="center" align="center"></el-table-column>
			<el-table-column prop="pic" label="头像" header-align="center" align="center">
				<template #default="scope">
					<el-image :src="scope.row.pic" />
				</template>
			</el-table-column>
			<el-table-column label="性别" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.sex === 1 ? '男' : '女' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="specialty" label="专业" header-align="center" align="center"></el-table-column>

			<el-table-column prop="startTime" label="入学时间" header-align="center" align="center"></el-table-column>
			<el-table-column prop="phone" label="手机号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="email" label="邮箱" header-align="center" align="center"></el-table-column>
			<el-table-column prop="password" label="登录密码" header-align="center" align="center"></el-table-column>
			<el-table-column label="今年是否修改过" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.updated === 0 ? '未改过' : '改过' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="认证状态" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.authStatus === 0 ? '未认证' : scope.row.authStatus === 1 ? '银认证' : '金认证' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="该账户是否未锁定" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.accountNonLocked ? '可用' : '停用' }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column prop="identify" label="身份证号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="lastPullTime" label="最后一次拉取系统消息时间" header-align="center" align="center"></el-table-column>
			<el-table-column label="是否可用" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.enabled === 0 ? '停用' : '可用' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="删除标识" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.deleted === 0 ? '存在' : '删除' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="用户类型" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.userType ? '测试用户' : '正常用户' }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column prop="createTime" label="创建时间" header-align="center" align="center"></el-table-column>
			<el-table-column prop="updateTime" label="更新时间" header-align="center" align="center"></el-table-column>
			<el-table-column prop="remark" label="备注" header-align="center" align="center"></el-table-column>
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
	</el-card>
</template>

<script setup lang="ts" name="SysRoleIndex">
import { reactive, ref } from 'vue'
import AddOrUpdate from './add-or-update.vue'
import { IHooksOptions } from '@/hooks/interface'
import { useCrud } from '../../../hooks/curd'

const state: IHooksOptions = reactive({
	dataListUrl: '/user/list',
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
