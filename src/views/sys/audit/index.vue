<!-- ExamAudit = (value: ExamineType) -->

<template>
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item prop="userId">
				<el-input v-model="state.queryForm.userId" placeholder="Id"></el-input>
			</el-form-item>
			<el-form-item prop="username">
				<el-input v-model="state.queryForm.username" placeholder="账号"></el-input>
			</el-form-item>
			<el-form-item prop="schoolName">
				<el-input v-model="state.queryForm.schoolName" placeholder="学校名称"></el-input>
			</el-form-item>
			<el-form-item prop="authStyle">
				<el-select v-model="state.queryForm.authStyle" placeholder="认证方式" clearable>
					<el-option label="学生证认证" :value="1" />
					<el-option label="邮件认证" :value="2" />
					<el-option label="学信网认证" :value="3" />
				</el-select>
			</el-form-item>
			<el-form-item prop="passed">
				<el-select v-model="state.queryForm.passed" placeholder="认证状态" clearable>
					<el-option label="未处理" :value="1" />
					<el-option label="已通过" :value="2" />
					<el-option label="未通过" :value="3" />
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
			<el-table-column prop="userId" label="用户id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
			<el-table-column prop="realname" label="真实姓名" header-align="center" align="center"></el-table-column>
			<el-table-column prop="schoolId" label="学校id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="schoolName" label="学校" header-align="center" align="center"></el-table-column>

			<el-table-column label="认证方式" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.authStyle === 1 ? '学生证认证' : scope.row.authStyle === 2 ? '邮件认证' : '学信网认证' }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column label="认证状态" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.passed === 1 ? '未处理' : scope.row.passed === 2 ? '已通过' : '未通过' }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column prop="authMessage" label="认证内容" header-align="center" align="center"></el-table-column>
			<el-table-column prop="errMessage" label="失败原因" header-align="center" align="center"></el-table-column>
			<el-table-column prop="createTime" label="创建时间" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="200">
				<template #default="scope">
					<el-button
						type="primary"
						link
						@click="
							updateHandle({
								id: scope.row.id,
								passed: scope.row.passed,
								errMessage: scope.row.errMessage
							})
						"
						>审核</el-button
					>
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
		<Exam ref="examRef" @refresh-data-list="getDataList"></Exam>
	</el-card>
</template>

<script setup lang="ts" name="SysRoleIndex">
import { reactive, ref } from 'vue'
import Exam from './exam.vue'
import { IHooksOptions } from '@/hooks/interface'
import { useCrud } from '../../../hooks/curd'
import { ExamineType } from '@/api/sys/audit'

const state: IHooksOptions = reactive({
	dataListUrl: '/stuauth/list',
	deleteUrl: '/school/deleteById',
	enableDisableUrl: '/school/updateStatus',
	queryForm: {
		name: ''
	}
})

const { getDataList, sizeChangeHandle, currentChangeHandle, reset } = useCrud(state)

const queryRef = ref()
const examRef = ref()
const updateHandle = (value: ExamineType) => {
	examRef.value.init(value)
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
