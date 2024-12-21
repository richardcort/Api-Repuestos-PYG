import { CategoryDB } from "../config"
import { CategoryInterface } from "../interfaces"

const categoryServices = {
    getAll: async () => {
        try {
            const categories = await CategoryDB.findAll({ where: { status: true } })
            if (categories.length === 0) {
                return {
                    message: "No records found",
                    status: 404,
                    data: {
                        categories
                    }
                }
            }
            return {
                message: "Records found",
                status: 200,
                data: {
                    categories
                }
            }
        } catch (error) {
            console.log("Error in categoryServices.getAll: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    getOne: async (code: string) => {
        code = code.toUpperCase()
        try {
            const category = await CategoryDB.findOne({
                where: {
                    category_code: code,
                    status: true
                }
            })
            if (!category) {
                return {
                    message: "No record found",
                    status: 404,
                    data: {
                        category
                    }
                }
            }
            return {
                message: "Record found",
                status: 200,
                data: {
                    category
                }
            }
        } catch (error) {
            console.log("Error in categoryServices.getOne: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    getOneByName: async (name: string) => {
        name = name.toLowerCase()
        try {
            const category = await CategoryDB.findOne({
                where: {
                    name,
                    status: true
                }
            })
            if (!category) {
                return {
                    message: "No record found",
                    status: 404,
                    data: {
                        category
                    }
                }
            }
            return {
                message: "Record found",
                status: 200,
                data: {
                    category
                }
            }
        } catch (error) {
            console.log("Error in categoryServices.getOneByName: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    create: async (data: Partial<CategoryInterface>) => {
        data.category_code = data.category_code?.toUpperCase()
        data.name = data.name?.toLowerCase()
        try {
            const category = await CategoryDB.create({ ...data })
            return {
                message: "Successful creation",
                status: 201,
                data: {
                    category
                }
            }
        } catch (error) {
            console.log("Error in categoryServices.create: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    update: async (dataRequest: Partial<CategoryInterface>, code: string) => {
        dataRequest.name = dataRequest.name?.toLowerCase()
        delete dataRequest.category_code
        code = code.toUpperCase()
        try {
            await CategoryDB.update(dataRequest, {
                where: {
                    category_code: code
                }
            })
            const { data } = await categoryServices.getOne(code)
            return {
                message: "Successful upgrade",
                status: 200,
                data: {
                    category: data?.category
                }
            }
        } catch (error) {
            console.log("Error in categoryServices.update: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    delete: async (code: string) => {
        code = code.toUpperCase()
        try {
            await CategoryDB.update(
                {
                    status: false,
                    deletedAt: new Date()
                },
                {
                    where: { category_code: code }
                }
            )
            return {
                message: "Successful removal",
                status: 200,
            }
        } catch (error) {
            console.log("Error in categoryServices.delete: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    }
}

export {
    categoryServices
}