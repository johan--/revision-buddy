export interface IUser {
    user_name: string,
    password_hash: string,
    firstname: string,
    lastname: string,
    email: string,
    email_confirmed: boolean,
    phone_number: string,
    phone_number_confirmed: boolean
}