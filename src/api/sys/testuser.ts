import service from '@/utils/request'

export interface AddTestUserType {
	num: number
	schoolId: number
}

export interface UpdateTestuserType {
	id: number
	schoolId: number
	campusId: number
	username: string
	pic: string
	startTime: string
	sex: number
	specialty: string
	authStatus: number
}

export const addTestUser = (value: AddTestUserType) => {
	return service.post('/user/test/insert', {
		value
	})
}

export const UpdateTestUser = (value: UpdateTestuserType) => {
	return service.post('/user/test/update', {
		value
	})
}
