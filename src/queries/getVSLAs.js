import gql from "graphql-tag";

const getAllVSLAs = gql`
  query getvslas {
    vslas {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export default getAllVSLAs;