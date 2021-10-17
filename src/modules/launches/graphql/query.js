import { gql } from "@apollo/client";

export const ALL_LAUNCHES = gql`
  {
    launches(sort: "launch_date_utc", order: "desc") {
      mission_name
      upcoming
      launch_date_utc
      id
    }
  }
`;

export const LAUNCH_DETAILS = gql`
  query GetLaunchDetail($id: ID!) {
    launch(id: $id) {
      mission_name
      rocket {
        rocket_name
        rocket_type
        rocket {
          id
          engines {
            type
            number
            layout
          }
          company
          cost_per_launch
          country
          height {
            feet
            meters
          }
        }
      }
      tentative_max_precision
      static_fire_date_utc
      launch_year
      launch_success
      launch_site {
        site_name
        site_name_long
      }
      upcoming
      static_fire_date_unix
      details
      launch_date_local
      launch_date_utc
      launch_date_unix
      links {
        flickr_images
      }
    }
  }
`;
