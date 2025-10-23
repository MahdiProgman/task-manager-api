import { User as UserDomainEntity } from '../entities/user.entity';
import { User as UserPersistenceEntity } from '@prisma/client';
import { UserMapper } from './user.mapper';

const userDomainEntity = new UserDomainEntity({
  email: 'mahdiDomain@gmail.com',
  firstName: 'Mahdi',
  lastName: 'HabibKhah',
  password: 'hashed_password',
});

const userPersistenceEntity: UserPersistenceEntity = {
  id: 'abcd-efgh-ijkl-mnop',
  email: 'mahdiPersistence@gmail.com',
  firstName: 'Mahdi',
  lastName: 'HabibKhah',
  password: 'hashed_password',
  createdAt: new Date(),
};

describe('UserMapper', () => {
  describe('toDomain', () => {
    it('should be convert user persistence entity to user domain entity', () => {
      const result = UserMapper.toDomain(userPersistenceEntity);

      expect(result.email).toBe('mahdiPersistence@gmail.com');
    });
  });
  describe('toPersistence', () => {
    it('should be convert user domain entity to user persistence entity', () => {
      const result = UserMapper.toPersistence(userDomainEntity);

      expect(result.email).toBe('mahdiDomain@gmail.com');
    });
  });
});
