import { RoleDB } from "../config"
import { RoleInterface } from "../interfaces"

const roleServices = {
    getAll: async () => {
        try {
            const roles = await RoleDB.findAll({ where: { status: true } })

            if (roles.length === 0) {
                return {
                    message: "No records found",
                    status: 404,
                    data: {
                        roles
                    }
                }
            }

            return {
                message: "Records found",
                status: 200,
                data: {
                    roles
                }
            }

        } catch (error) {
            console.error(error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    getOne: async (id: number | string) => {
        try {
            const role = await RoleDB.findOne({
                where: {
                    role_id: id,
                    status: true
                }
            })

            if (!role) {
                return {
                    message: "No record found",
                    status: 404,
                    data: {
                        role
                    }
                }
            }

            return {
                message: "Record found",
                status: 200,
                data: {
                    role
                }
            }

        } catch (error) {
            console.error(error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    create: async (data: Partial<RoleInterface>) => {
        data.name = data.name?.toLowerCase()

        try {
            const role = await RoleDB.create({ ...data })
            return {
                message: "Successful creation",
                status: 201,
                data: {
                    role
                }
            }

        } catch (error) {
            console.error(error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    update: async (dataRequest: Partial<RoleInterface>, id: number | string) => {
        dataRequest.name = dataRequest.name?.toLowerCase()

        try {
            await RoleDB.update(dataRequest, {
                where: {
                    role_id: id
                }
            })
            const { data } = await roleServices.getOne(id)

            return {
                message: "Successful upgrade",
                status: 201,
                data: {
                    role: data?.role
                }
            }

        } catch (error) {
            console.error(error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    delete: async (id: number) => {
        try {
            await RoleDB.update(
                {
                    status: false,
                    deleteAt: new Date()
                },
                {
                    where: { role_id: id }
                }
            )

            return {
                message: "Successful removal",
                status: 204,
                data: {
                    role: null
                }
            }

        } catch (error) {
            console.error(error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    getByName: async (name: string) => {
        try {
            const role = await RoleDB.findAll({ where: { name } })

            if (role.length === 0) {
                return {
                    message: "No record found",
                    status: 404,
                    data: {
                        role
                    }
                }
            }

            return {
                message: "Record found",
                status: 200,
                data: {
                    role: role[0]
                }
            }

        } catch (error) {
            console.error(error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
}

export {
    roleServices
}