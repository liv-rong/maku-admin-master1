export interface SchoolType {
	id?: string // 主键
	name?: string // 学校名称
	pic?: string // 学校图标
	schoolNo?: string // 学校国内唯一id
	abbreviate?: string // 学校简称
	website?: string // 学校官网
	provinceName?: string // 学校所属省名称
	cityName?: string // 学校所属市名称
	department?: string // 所属政府部门
	educationalLevel?: string // 办学层次
	it985?: string // 是否是985 (0: 不是 , 1: 是)
	it211?: string // 是否是211 (0: 不是 , 1: 是)
	doubleFirstIt?: string // 其他信息
	enabled?: boolean
	auditIt?: boolean
	emailSuffix?: string
}

export interface CampusType {
	id?: number | string
	schoolId?: number | string
	name?: string
	longitude?: string
	latitude?: string
}
