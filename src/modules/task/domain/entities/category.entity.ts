interface CategoryProps {
  id?: string;
  name: string;
  userId: string;
  createdAt?: Date;
}

export class Category {
  public readonly id?: string;
  public readonly name: string;
  public readonly userId: string;
  public readonly createdAt?: Date;

  constructor(props: CategoryProps) {
    this.id = props.id;
    this.name = props.name;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
  }

  static create(props: CategoryProps) {
    return new Category(props);
  }
}
