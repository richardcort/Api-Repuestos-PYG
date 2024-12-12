import { CompanyDB } from "../config/sequelize.config"
import { CompanyInterface } from "../interfaces"

const companyServices = {
    getRecord: async () => {
        try {
            const company = await CompanyDB.findAll()
            if (company.length === 0) {
                return {
                    message: "No record found",
                    status: 404,
                    data: {
                        company
                    }
                }
            }
            return {
                message: "Record found",
                status: 200,
                data: {
                    company: company[0]
                }
            }
        } catch (error) {
            console.log("Error in companyServices.getRecord: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    create: async (data: Partial<CompanyInterface>) => {
        try {
            const company = await CompanyDB.create({ ...data })
            return {
                message: "Successful creation",
                status: 201,
                data: {
                    company
                }
            }
        } catch (error) {
            console.log("Error in companyServices.create: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    },
    update: async (dataRequest: Partial<CompanyInterface>, rif: string) => {
        try {
            await CompanyDB.update(dataRequest, {
                where: {
                    rif: rif
                }
            })
            const { data } = await companyServices.getRecord()
            return {
                message: "Successful upgrade",
                status: 200,
                data: {
                    company: data?.company
                }
            }
        } catch (error) {
            console.log("Error in companyServices.update: " + error)
            return {
                message: "Contact the administrator: error",
                status: 500
            }
        }
    }
}

export {
    companyServices
}