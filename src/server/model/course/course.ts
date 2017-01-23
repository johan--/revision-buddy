export interface ICourse {
    board : string,
    class : string,
    subject: string,
    package_name: string,
    content: [{
        node_name: string,
        parent_node_id: string,
        type: string,
        file_name: string,
        file_type: string
    }]
}