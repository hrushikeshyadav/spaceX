import { gql } from "@apollo/client";

export const ALL_ROCKETS = gql`
  {
    rockets {
      id
      name
      active
      country
    }
  }
`;

export const ROCKET_DETAILS = gql`
  query GetRocketDetail($id: ID!) {
    rocket(id: $id) {
      id
      engines {
        layout
        version
        engine_loss_max
        type
        thrust_vacuum {
          kN
          lbf
        }
      }
      description
      name
      active
      boosters
      company
      cost_per_launch
      country
      diameter {
        feet
        meters
      }
      type
      success_rate_pct
      stages
      landing_legs {
        material
        number
      }
      height {
        feet
        meters
      }
      mass {
        kg
        lb
      }
      first_stage {
        burn_time_sec
        fuel_amount_tons
        engines
      }
      second_stage {
        fuel_amount_tons
        burn_time_sec
        engines
      }
    }
  }
`;
