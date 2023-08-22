import gql from "graphql-tag";

const getAllMembers = gql`
  query getMembers($offset: Int!, $limit: Int!) {
    members(pagination: { start: $offset, limit: $limit }) {
      data {
        id
        attributes {
          first_name
          last_name
          contact
          address
          vsla {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

export default getAllMembers;
