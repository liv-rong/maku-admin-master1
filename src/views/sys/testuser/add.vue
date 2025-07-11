<template>
	<el-dialog v-model="visible" title="新增" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="num" label="新增用户个数">
				<el-input v-model="dataForm.num" placeholder="新增用户个数"></el-input>
			</el-form-item>
			<el-form-item prop="schoolId" label="学校id">
				<el-input v-model="dataForm.schoolId" placeholder="学校id"></el-input>
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
import { addTestUser, type AddTestUserType } from '@/api/sys/testuser'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)

const dataFormRef = ref()

const loading = ref(false)

const dataForm = reactive<AddTestUserType>({
	num: 1,
	schoolId: 0
})

const dataRules = ref({
	num: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	schoolId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
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

		addTestUser(dataForm)
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
	init: () => {
		visible.value = true
	}
})
</script>
