import gql from "graphql-tag";

const addMemberMutation = gql`
  mutation addMember(
    $FirstName: String!
    $LastName: String!
    $Contact: String!
    $Gender: String!
    $VSLA: ID!
  ) {
    createMember(
      data: {
        first_name: $FirstName
        last_name: $LastName
        contact: $Contact
        gender: $Gender
        vsla: $VSLA
      }
    ) {
      data {
        attributes {
          first_name
          last_name
          contact
          gender
          vsla {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default addMemberMutation;
