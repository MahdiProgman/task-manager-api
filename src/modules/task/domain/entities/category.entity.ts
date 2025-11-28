interface CategoryProps {
  id?: string;
  name: string;
  userId: string;
  createdAt?: Date;
}

export class Category {
  public readonly id?: string;
  private _name: string;
  public readonly userId: string;
  public readonly createdAt?: Date;

  constructor(props: CategoryProps) {
    this.id = props.id;
    this._name = props.name;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
  }

  static create(props: CategoryProps) {
    return new Category(props);
  }

  public changeName(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
}
