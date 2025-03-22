import { gql } from "@apollo/client";


export const GSM_DATA = gql`
query GetGSMData($phoneNumber: String!) {
  getGSMData(phoneNumber: $phoneNumber) {
    distances
    latitude
    longitude
    phoneNumber
  }
}`