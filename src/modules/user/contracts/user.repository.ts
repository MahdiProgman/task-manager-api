import { User } from '../entities/user.entity';

export interface UserRepository {
  createOne(user: User): Promise<User>;
  findById(id: string): Promise<null | User>;
}
