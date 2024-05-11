import {UserResponse} from "../user/user-response.model";

export interface SocialEventResponse {
  id: number
  title: string
  description: string
  place: string
  date: Date
  imageUrl: string
  createdBy: UserResponse
  updatedBy: UserResponse
  createdAt: Date
}
