import { gql } from "@apollo/client";

export const UPCOMING_LAUNCHES = gql`
  {
    launchesUpcoming(limit: 5) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      id
    }
  }
`;


