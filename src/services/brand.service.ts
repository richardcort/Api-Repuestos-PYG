import { BrandDB } from "../config"
import { BrandInterface } from "../interfaces"

const brandServices = {
    getAll: async () => {
        try {
            const brands = await BrandDB.findAll({ where: { status: true } })
            if (brands.length === 0) {
                return {
                    message: "No records found",
                    status: 404,
                    data: {
                        brands
                    }
                }
            }
            return {
                message: "Records found",
                status: 200,
                data: {
                    brands
                }
            }
        } catch (error) {
            console.log("Error in brandServices.getAll: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    getOne: async (brandCode: string) => {
        brandCode = brandCode.toUpperCase()
        try {
            const brand = await BrandDB.findOne({
                where: {
                    brand_code: brandCode,
                    status: true
                }
            })
            if (!brand) {
                return {
                    message: "No record found",
                    status: 404,
                    data: {
                        brand
                    }
                }
            }
            return {
                message: "Record found",
                status: 200,
                data: {
                    brand
                }
            }
        } catch (error) {
            console.log("Error in brandServices.getOne: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    getOneByName: async (name: string) => {
        name = name.toLowerCase()
        try {
            const brand = await BrandDB.findOne({
                where: {
                    name: name,
                    status: true
                }
            })
            if (!brand) {
                return {
                    message: "No record found",
                    status: 404,
                    data: {
                        brand
                    }
                }
            }
            return {
                message: "Record found",
                status: 200,
                data: {
                    brand
                }
            }
        } catch (error) {
            console.log("Error in brandServices.getOneByName: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    create: async (data: Partial<BrandInterface>) => {
        data.name = data.name?.toLowerCase()
        data.brand_code = data.brand_code?.toUpperCase()
        try {
            const brand = await BrandDB.create({ ...data })
            return {
                message: "Successful creation",
                status: 201,
                data: {
                    brand
                }
            }
        } catch (error) {
            console.log("Error in brandServices.create: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    update: async (dataRequest: Partial<BrandInterface>, code: string) => {
        dataRequest.name = dataRequest.name?.toLocaleLowerCase()
        delete dataRequest.brand_code
        try {
            await BrandDB.update(dataRequest, {
                where: {
                    brand_code: code
                }
            })
            const { data } = await brandServices.getOne(code)
            return {
                message: "Successful upgrade",
                status: 200,
                data: {
                    brand: data?.brand
                }
            }
        } catch (error) {
            console.log("Error in brandServices.update: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    delete: async (code: string) => {
        try {
            await BrandDB.update(
                {
                    status: false,
                    deletedAt: new Date()
                },
                {
                    where: { brand_code: code }
                }
            )
            return {
                message: "Successful removal",
                status: 200,
            }
        } catch (error) {
            console.log("Error in brandServices.delete: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    }
}

export {
    brandServices
}