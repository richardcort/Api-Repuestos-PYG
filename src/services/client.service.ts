import { ClientDB } from "../config"
import { ClientInterface } from "../interfaces"

const clientServices = {
    getAll: async () => {
        try {
            const clients = await ClientDB.findAll({ where: { status: true } })
            if (clients.length === 0) {
                return {
                    message: "No records found",
                    status: 404,
                    data: {
                        clients
                    }
                }
            }
            return {
                message: "Records found",
                status: 200,
                data: {
                    clients
                }
            }
        } catch (error) {
            console.log("Error in clientServices.getAll: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    getOne: async (cedula: string) => {
        try {
            const client = await ClientDB.findOne({
                where: {
                    cedula,
                    status: true
                }
            })
            if (!client) {
                return {
                    message: "No record found",
                    status: 404,
                    data: {
                        client
                    }
                }
            }
            return {
                message: "Record found",
                status: 200,
                data: {
                    client
                }
            }
        } catch (error) {
            console.log("Error in clientServices.getOne: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    create: async (data: Partial<ClientInterface>) => {
        data.name = data.name?.toLowerCase()
        data.last_name = data.last_name?.toLowerCase()
        try {
            const client = await ClientDB.create({ ...data })
            return {
                message: "Successful creation",
                status: 201,
                data: {
                    client
                }
            }
        } catch (error) {
            console.log("Error in clientServices.create: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    update: async (dataRequest: Partial<ClientInterface>, cedula: string) => {
        dataRequest.name = dataRequest.name?.toLowerCase()
        dataRequest.last_name = dataRequest.last_name?.toLowerCase()
        delete dataRequest.cedula
        try {
            await ClientDB.update(dataRequest, {
                where: {
                    cedula
                }
            })
            const { data } = await clientServices.getOne(cedula)
            return {
                message: "Successful upgrade",
                status: 200,
                data: {
                    client: data?.client
                }
            }
        } catch (error) {
            console.log("Error in clientServices.update: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    delete: async (cedula: string) => {
        try {
            await ClientDB.update(
                {
                    deleteAt: new Date(),
                    status: false
                },
                {
                    where: {
                        cedula
                    }
                })
            return {
                message: "Successful removal",
                status: 200,
            }
        } catch (error) {
            console.log("Error in clientServices.delete: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
}

export {
    clientServices
}