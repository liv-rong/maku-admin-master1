<template>
	<el-dialog v-model="visible" title="修改" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="id" label="id">
				<el-input v-model="dataForm.id" placeholder="id"></el-input>
			</el-form-item>
			<el-form-item prop="schoolId" label="学校ID">
				<el-input v-model="dataForm.schoolId" placeholder="学校ID"></el-input>
			</el-form-item>
			<el-form-item prop="campusId" label="校区ID">
				<el-input v-model="dataForm.campusId" placeholder="校区ID"></el-input>
			</el-form-item>
			<el-form-item prop="username" label="账号">
				<el-input v-model="dataForm.username" placeholder="账号"></el-input>
			</el-form-item>
			<el-form-item prop="pic" label="头像">
				<el-input v-model="dataForm.username" placeholder="头像"></el-input>
			</el-form-item>
			<el-form-item prop="startTime" label="入学时间">
				<el-date-picker v-model="dataForm.startTime" type="date" placeholder="入学时间" />
			</el-form-item>
			<el-form-item label="性别">
				<el-tooltip :content="dataForm.sex === 1 ? '男 ' : '女'" placement="top">
					<el-switch v-model="dataForm.sex" />
				</el-tooltip>
			</el-form-item>
			<el-form-item prop="specialty" label="专业">
				<el-input v-model="dataForm.specialty" placeholder="专业"></el-input>
			</el-form-item>
			<el-form-item label="认证状态">
				<el-tooltip :content="dataForm.authStatus === 0 ? '未认证' : dataForm.authStatus === 1 ? '银认证' : '金认证'" placement="top">
					<el-switch v-model="dataForm.authStatus" />
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
import { UpdateTestUser, UpdateTestuserType } from '@/api/sys/testuser'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)

const dataFormRef = ref()

const loading = ref(false)

const dataForm = reactive<UpdateTestuserType>({
	id: 0,
	schoolId: 0,
	campusId: 0,
	username: '',
	pic: '',
	startTime: '',
	sex: 1,
	specialty: '',
	authStatus: 1
})

const init = async (value: Record<string, any>) => {
	visible.value = true
	const { id, schoolId, campusId, username, sex, pic, startTime, specialty, authStatus } = value
	Object.assign(dataForm, {
		id,
		schoolId,
		campusId,
		username,
		pic,
		startTime,
		sex,
		specialty,
		authStatus
	})
}

const dataRules = ref({
	id: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	schoolId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	campusId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	username: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	pic: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	startTime: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	sex: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	specialty: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	authStatus: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

const submitHandle = () => {
	if (loading.value === true) {
		return
	}
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		UpdateTestUser(dataForm)
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
