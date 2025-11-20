import { DatabaseService } from 'src/database/database.service';
import { UserRepository as IUserRepository } from '../../domain/contracts/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async createOne(user: User): Promise<User> {
    const result = await this.databaseService.user.create({
      data: UserMapper.toPersistence(user),
    });

    return UserMapper.toDomain(result);
  }

  public async findById(id: string): Promise<null | User> {
    const userFound = await this.databaseService.user.findUnique({
      where: {
        id: id,
      },
    });

    return userFound ? UserMapper.toDomain(userFound) : null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const userFound = await this.databaseService.user.findUnique({
      where: {
        email: email,
      },
    });

    return userFound ? UserMapper.toDomain(userFound) : null;
  }
}
