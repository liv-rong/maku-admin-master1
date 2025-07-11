import service from '@/utils/request'

export interface ExamineType {
	id: number
	passed?: number
	errMessage?: string
}

export const ExamAudit = (value: ExamineType) => {
	return service.post('/stuauth/examine', {
		value
	})
}
