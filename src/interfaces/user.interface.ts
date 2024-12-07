import { RoleInterface } from "./role.interface"

export interface UserInterface {
    user_id?: number
    name: string
    email: string
    password: string
    status?: boolean
    role_id?: number | string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    role?: RoleInterface
}