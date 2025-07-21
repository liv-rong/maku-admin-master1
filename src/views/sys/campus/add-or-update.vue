<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="id" label="Id">
				<el-input v-model.number="dataForm.id" placeholder="Id"></el-input>
			</el-form-item>
			<el-form-item prop="schoolId" label="学校Id">
				<el-input v-model.number="dataForm.schoolId" placeholder="学校Id"></el-input>
			</el-form-item>
			<el-form-item prop="name" label="校区名称">
				<el-input v-model="dataForm.name" placeholder="校区名称"></el-input>
			</el-form-item>
			<el-form-item prop="longitude" label="校区经度">
				<el-input v-model="dataForm.longitude" placeholder="校区经度"></el-input>
			</el-form-item>
			<el-form-item prop="latitude" label="校区纬度">
				<el-input v-model="dataForm.latitude" placeholder="校区纬度"></el-input>
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
import { getSchoolById, updateCampus } from '@/api/sys/school'
import { CampusType } from '@/types/shool'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)

const dataFormRef = ref()

const loading = ref(false)

const dataForm = reactive<CampusType>({})

const init = async (id?: number) => {
	visible.value = true
	dataForm.id = 0

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	// id 存在则为修改
	if (id) {
		getSchoolById('/campus/deleteById', id).then(res => {
			console.log(res)
			Object.assign(dataForm, res.data)
		})
	}
}

const dataRules = ref({
	schoolId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	schoolNo: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	id: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	longitude: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	latitude: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
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

		updateCampus(dataForm)
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
