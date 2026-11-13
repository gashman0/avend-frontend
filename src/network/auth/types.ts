
export interface signupPayload {
  name: string;
  email: string;
  username: string;
  password: string;
  country: string;
  phone: string;
}

export interface loginPayload {
  email?: string;
  username?: string;
  password: string;
}

export interface forgottenPasswordPayload {
  email: string;
}

export interface resetPasswordPayload {
  token: string;
  password: string;
}
