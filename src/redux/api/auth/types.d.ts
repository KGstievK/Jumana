namespace AUTH {
  type GetResponse = {
    // profile: User
    _id?: number;
    // image?: string;
    username: string;
    first_name: string;
    last_name: string;
    address: string;
    index_pochta: string;
    number: string;
  }[];
  type GetRequest = void;

  type PutMeResponse = {
    access: string;
    refresh: string;
  }
  type PutMeRequest = {
    id: number
    username: string;
    first_name?: string;
    last_name?: string;
    address?: string;
    index_pochta?: string;
    number: string;
  }

  type PostLoginResponse = {
    // accessToken: string;
    // accessTokenExpiration: number;
    // refreshToken: string
    access: string;
    refresh: string;
    // key: string
  };

  type PostLoginRequest = {
    // email: string;
    username: string;
    password: string;
  };

  type PostRegistrationResponse = {
    // key: string
    access: string;
    refresh: string;
    message: string;
    // accessToken: string;
    // accessTokenExpiration: number;
    // refreshToken: string
  };
  type PostRegistrationRequest = {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
  };

  type PostLogoutResponse = {
    // message: string;
  };
  type PostLogoutRequest = void;

  type PatchRefreshResponse = {
    access: string;
    refresh: string;
    // accessToken: string;
    // accessTokenExpiration: number;
    // key: string
  };
  type PatchRefreshRequest = {
    refresh: string
  };

  type PostForgotPasswordResponse = {
    message: string;
  };
  type PostForgotPasswordRequest = {
    email: string;
    frontEndUrl: string;
  };

  type PatchResetPasswordResponse = {
    message: string;
  };
  type PatchResetPasswordRequest = {
    // token: string;
    access: string;
    refresh: string;
    newPassword: string;
  };
}
