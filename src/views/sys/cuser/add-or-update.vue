<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="schoolNo" label="编号">
				<el-input v-model="dataForm.schoolNo" placeholder="编号"></el-input>
			</el-form-item>
			<el-form-item prop="name" label="学校名称">
				<el-input v-model="dataForm.name" placeholder="学校名称"></el-input>
			</el-form-item>
			<el-form-item prop="abbreviate" label="学校简称">
				<el-input v-model="dataForm.abbreviate" placeholder="学校简称"></el-input>
			</el-form-item>
			<el-form-item prop="pic" label="图标">
				<el-input v-model="dataForm.pic" placeholder="图标"></el-input>
			</el-form-item>
			<el-form-item label="审核状态">
				<el-tooltip :content="dataForm.auditIt ? '已审核' : '未审核'" placement="top">
					<el-switch v-model="dataForm.auditIt" />
				</el-tooltip>
			</el-form-item>
			<el-form-item prop="emailSuffix" label="邮箱后缀">
				<el-input v-model="dataForm.emailSuffix" placeholder="邮箱后缀"></el-input>
			</el-form-item>
			<el-form-item label="启用/禁用">
				<el-tooltip :content="dataForm.enabled ? '启用' : '禁用'" placement="top">
					<el-switch v-model="dataForm.enabled" />
				</el-tooltip>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" :loading="loading" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { getSchoolById, updateSchool } from '@/api/sys/school'
import { SchoolType } from '@/types/shool'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)

const dataFormRef = ref()

const loading = ref(false)

const dataForm = reactive<SchoolType>({
	id: '',
	name: '',
	pic: '',
	schoolNo: '',
	abbreviate: '',
	enabled: true,
	auditIt: false
})

const init = async (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	// id 存在则为修改
	if (id) {
		getSchoolById('/school/deleteById', id).then(res => {
			console.log(res)
			Object.assign(dataForm, res.data)
		})
	}
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	schoolNo: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	if (loading.value === true) {
		return
	}
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		updateSchool(dataForm)
			.then(() => {
				ElMessage.success({
					message: '操作成功',
					duration: 500,
					onClose: () => {
						visible.value = false
						emit('refreshDataList')
					}
				})
			})
			.catch(() => {
				ElMessage.success({
					message: '操作失败',
					duration: 500,
					onClose: () => {}
				})
			})
			.finally(() => {
				loading.value = false
			})
	})
}

defineExpose({
	init
})
</script>
