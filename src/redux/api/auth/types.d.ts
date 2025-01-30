namespace AUTH {
  type GetResponse = {
    id: number
    username: string
    first_name: string;
    last_name: string;
    email: string
    address: string;
    number: string;
  }[];
  type GetRequest = void;

  type PutMeResponse = {
  }
  type PutMeRequest = {
    id: number
    username: string
    first_name: string;
    last_name: string;
    email: string
    address: string;
    number: string;
  }

  type PostLoginResponse = {
    access: string;
    refresh: string;
  };

  type PostLoginRequest = {
    username: string;
    password: string;
  };

  type PostRegistrationResponse = {
    access: string;
    refresh: string;
  };
  type PostRegistrationRequest = {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
  };

  type PostLogoutResponse = {
  };
  type PostLogoutRequest = void;

  type PatchRefreshResponse = {
    access: string;
    refresh: string;
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
    // message: string;
  };
  type PatchResetPasswordRequest = {
    access: string;
    newPassword: string;
  };
}
