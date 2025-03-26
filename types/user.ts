export interface Credentials {
  username: string
  passphrase: string
}

export interface User {
  id: string
  name: string
  surname: string
  credentials: Credentials
  active: boolean
  created: string
  _comment?: string
}

export interface SafeUser {
  id: string
  name: string
  surname: string
  email: string
  active: boolean
  created: string
  _comment?: string
}
