export interface ICourse {
    board : string,
    class : string,
    subject: string,
    content: [{
        node_name: string,
        file_name: string,
        file_type: string,
        children: [{
            node_name: string,
            file_name: string,
            file_type: string
        }]
    }]
}