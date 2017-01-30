export interface IUser {
    user_name: string,
    password_hash: string,
    firstname: string,
    lastname: string,
    email: string,
    email_confirmed: boolean,
    phone_number: string,
    phone_number_confirmed: boolean,
    active: boolean,
    parent_lead_id: string,
    parent_name: string,
    lead_id: string,
    status: string,
    revisionpack_subscriptions: [
        {
            course_id: string,
            tutor_id: string
        }
    ]
}