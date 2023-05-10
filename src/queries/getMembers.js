import gql from "graphql-tag";

const getAllMembers = gql ` 
    query getMembers{
        members {
        data{
            id
            attributes{
                first_name
                last_name
                contact
            }
        }
        }
    }

`

export default getAllMembers;