import service from '@/utils/request'
import type { SchoolType, CampusType } from '@/types/shool'

export const getSchoolById = (url: string, id: number) => {
	return service.post(url, {
		idl: id
	})
}
export const updateSchool = (value: SchoolType) => {
	return service.post('/school/saveOrUpdate', {
		...value
	})
}

export const updateCampus = (value: CampusType) => {
	return service.post('/campus/saveOrUpdate', {
		...value
	})
}

export const deleteById = (url: string, id: number) => {
	return service.post(url, {
		idl: id
	})
}
export const enableDisable = (url: string, idl: number, enabled: boolean) => {
	return service.post(url, {
		idl,
		enabled
	})
}
