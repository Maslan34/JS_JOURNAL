import { gql } from "@apollo/client";
export const NEW_PARTICIPANT_MUTATION = gql`
mutation AddParticipant($username: String, $email: String, $event_id: Int) {
  addParticipant(username: $username, email: $email, event_id: $event_id) {
    id
    event_id

  }
}
`;