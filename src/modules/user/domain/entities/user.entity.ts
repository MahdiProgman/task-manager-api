interface UserProps {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class User {
  public readonly id?: string;
  public firstName: string;
  public lastName: string;
  private _email: string;
  private _password: string;
  public createdAt?: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this._email = props.email;
    this._password = props.password;
    this.createdAt = props.createdAt;
  }

  static create(props: UserProps) {
    return new User(props);
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }
}
