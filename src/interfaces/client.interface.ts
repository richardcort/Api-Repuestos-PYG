export interface ClientInterface {
    cedula: string
    name: string
    last_name: string
    phone_number: string
    status?: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}