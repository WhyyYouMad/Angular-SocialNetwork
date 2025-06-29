export class AuthModel {
  login?: string;
  password?: string;
  passwordConfirm?: string;

  constructor(initialData: Partial<AuthModel>) {
    this.login = initialData.login ? initialData.login : '';
    this.password = initialData.password ? initialData.password : '';
    this.passwordConfirm = initialData.passwordConfirm ? initialData.passwordConfirm : '';
  }
}

export interface UserInfo {
  token: string;
  user: User;
}

export class User {
  name?: string;
  email?: string;
  role?: string[];

  constructor(initialData?: Partial<User>) {
    this.name = initialData?.name ? initialData.name : '';
    this.email = initialData?.email ? initialData.email : '';
    this.role = initialData?.role ? initialData.role : [];
  }
}
