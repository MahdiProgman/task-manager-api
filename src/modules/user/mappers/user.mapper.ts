import { User as UserPersistenceEntity } from '@prisma/client';
import { User as UserDomainEntity } from '../entities/user.entity';
import { Prisma } from '@prisma/client';

export class UserMapper {
  static toDomain(data: UserPersistenceEntity): UserDomainEntity {
    return new UserDomainEntity({
      ...data,
    });
  }

  static toPersistence(data: UserDomainEntity): Prisma.UserCreateInput {
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };
  }
}
