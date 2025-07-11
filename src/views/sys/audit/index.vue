<!-- ExamAudit = (value: ExamineType) -->

<template>
	<el-card>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border class="layout-table">
			<el-table-column prop="id" label="id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="userId" label="微信小程序用户唯一标识" header-align="center" align="center"></el-table-column>
			<el-table-column prop="unionId" label="微信小程序用户在开放平台的唯一标识符" header-align="center" align="center"></el-table-column>
			<el-table-column prop="schoolId" label="学校id" header-align="center" align="center"></el-table-column>
			<el-table-column label="认证方式" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.authStyle === 1 ? '学生证认证' : scope.row.authStyle === 2 ? '邮件认证' : '学信网认证' }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column label="认证状态" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.passed === 1 ? '未处理' : scope.row.authStyle === 2 ? '已通过' : '未通过' }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column prop="authMessage" label="认证内容" header-align="center" align="center"></el-table-column>
			<el-table-column prop="errMessage" label="失败原因" header-align="center" align="center"></el-table-column>

			<el-table-column label="是否可用" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.enabled === 1 ? '可用' : '停用' }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column label="删除标识" width="100" header-align="center" align="center">
				<template #default="scope">
					<el-tag>{{ scope.row.deleted === 1 ? '存在' : '删除' }}</el-tag>
				</template>
			</el-table-column>

			<el-table-column prop="createTime" label="创建时间" header-align="center" align="center"></el-table-column>

			<el-table-column prop="updateTime" label="更新时间" header-align="center" align="center"></el-table-column>

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
const examHandle = (value: ExamineType) => {
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
