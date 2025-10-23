import { User } from './user.entity';

describe('UserEntity', () => {
  describe('constructor', () => {
    it('should be create a new instance of user successfully', () => {
      const user = new User({
        firstName: 'Mahdi',
        lastName: 'HabibKhah',
        email: 'mahdihabibkah78@gmail.com',
        password: 'hashed_password',
      });

      expect(user).toBeInstanceOf(User);
    });
  });
});
