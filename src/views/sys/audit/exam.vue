<template>
	<el-dialog v-model="visible" title="审核" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="id" label="id">
				<el-input v-model="dataForm.id" placeholder="id"></el-input>
			</el-form-item>
			<el-form-item label="认证状态">
				<el-radio-group v-model="dataForm.passed">
					<el-radio :value="1">未处理</el-radio>
					<el-radio :value="2">已通过</el-radio>
					<el-radio :value="3">未通过</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="errMessage" label="失败原因">
				<el-input v-model="dataForm.errMessage" placeholder="失败原因"></el-input>
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
import { ExamAudit, type ExamineType } from '@/api/sys/audit'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)

const dataFormRef = ref()

const loading = ref(false)

const dataForm = reactive<ExamineType>({
	id: 1
})

const dataRules = ref({
	id: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
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

		ExamAudit(dataForm)
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
	init: (value: ExamineType) => {
		visible.value = true
		Object.assign(dataForm, value)
	}
})
</script>
