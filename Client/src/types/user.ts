export type User = {
    email: string,
    password: string,
    displayName: string,
    imageUrl?: string
}

export type LoginCreds = {
    email: string,
    password: string
}

export type RegisterCreds = {
    email: string,
    password: string,
    displayName: string
}