namespace AUTH {
  type GetResponse = {
    // profile: User
    username: string;
    first_name: string;
    last_name: string;
    address: string;
    index_pochta: string;
    number: string;
  };
  type GetRequest = void;

  type PostLoginResponse = {
    // accessToken: string;
    // accessTokenExpiration: number;
    // refreshToken: string
    access: string;
    refresh: string;
    // key: string
  };

  type PostLoginRequest = {
    username: string;
    // email: string;
    password: string;
  };

  type PostRegistrationResponse = {
    // key: string
    access: string;
    refresh: string;
    // message: string;
    // accessToken: string;
    // accessTokenExpiration: number;
    // refreshToken: string
  };
  type PostRegistrationRequest = {
    userName: string;
    // email: string;
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
  type PatchRefreshRequest = void;

  type PostForgotPasswordResponse = {
    // message: string;
  };
  type PostForgotPasswordRequest = {
    email: string;
    frontEndUrl: string;
  };

  type PatchResetPasswordResponse = {
    // message: string;
  };
  type PatchResetPasswordRequest = {
    // token: string;
    access: string;
    refresh: string;
    newPassword: string;
  };
}
