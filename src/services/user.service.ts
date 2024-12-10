import { UserBD } from "../config"
import { UserInterface } from "../interfaces"

const userServices = {
    getAll: async () => {
        try {
            const users = await UserBD.findAll()

            if (users.length === 0) {
                return {
                    message: "No records found",
                    status: 404,
                    data: {
                        users
                    }
                }
            }

            return {
                message: "Records found",
                status: 200,
                data: {
                    users
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
            const user = await UserBD.findOne({
                where: {
                    user_id: id,
                    status: true
                }
            })

            if (!user) {
                return {
                    message: "No record found",
                    status: 404,
                    data: {
                        user
                    }
                }
            }

            return {
                message: "Record found",
                status: 200,
                data: {
                    user
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
    create: async (data: Partial<UserInterface>) => {
        data.name = data.name?.toLowerCase()

        try {
            const user = await UserBD.create({ ...data })
            return {
                message: "Successful creation",
                status: 201,
                data: {
                    user
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
    update: async (dataRequest: Partial<UserInterface>, id: number | string) => {
        dataRequest.name = dataRequest.name?.toLowerCase()

        try {
            await UserBD.update(dataRequest, {
                where: {
                    user_id: id
                }
            })
            const { data } = await userServices.getOne(id)

            return {
                message: "Successful upgrade",
                status: 201,
                data: {
                    user: data?.user
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
            await UserBD.update(
                {
                    status: false,
                    deleteAt: new Date()
                },
                {
                    where: { user_id: id }
                }
            )

            return {
                message: "Successful removal",
                status: 204,
                data: {
                    user: null
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
    getByEmail: async (email: string) => {
        try {
            const user = await UserBD.findAll({ where: { email } })

            if (user.length === 0) {
                return {
                    message: "No record found",
                    status: 404,
                    data: {
                        user
                    }
                }
            }

            return {
                message: "Record found",
                status: 200,
                data: {
                    user: user[0]
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
    userServices
}