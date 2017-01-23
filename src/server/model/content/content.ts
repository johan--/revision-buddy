export interface IContent {
    board : string,
    class : string,
    subject: string,
    name: string,
    content: [{
        node_name: string,
        parent_node_id: string,
        type: string,
        file_name: string,
        file_type: string
    }]
}