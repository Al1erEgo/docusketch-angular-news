export interface User {
  id: number
  email: string
}

export interface CommonAuthResponse {
  accessToken: string
  user: User
}

export interface CommonAuthRequest {
  email: string
  password: string
}
