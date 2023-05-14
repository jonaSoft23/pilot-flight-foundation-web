import gql from "graphql-tag";

const addMemberMutation = gql`
    mutation addMember($FirstName: String!, $LastName: String!, $Contact: String!) {
        createMember(
            data: { first_name: $FirstName, last_name: $LastName, contact: $Contact }
            ) {
                data {
                    attributes {
                        first_name
                        last_name
                        contact
                    }
                }
            }
    }
    `;

export default addMemberMutation;
