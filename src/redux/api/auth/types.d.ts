namespace AUTH {
	type GetResponse = {
		profile: User
	};
	type GetRequest = void;

	type PostLoginResponse = {
		// accessToken: string;
		// accessTokenExpiration: number;
		// refreshToken: string
		key: string
	};
	
	type PostLoginRequest = {
		username: string;
		email: string;
		password: string;
	};

	type PostRegistrationResponse = {
		key: string
		// message: string;
		// accessToken: string;
		// accessTokenExpiration: number;
		// refreshToken: string
	};
	type PostRegistrationRequest = {
		userName: string;
		email: string;
		password1: string;
		password2: string;
	};

	type PostLogoutResponse = {
		// message: string;
	};
	type PostLogoutRequest = void;

	type PatchRefreshResponse = {
		// accessToken: string;
		// accessTokenExpiration: number;
		key: string
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
		key: string;
		newPassword: string;
	};
}

