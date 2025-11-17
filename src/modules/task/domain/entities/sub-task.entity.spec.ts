import { TaskStatus } from './enums';
import { SubTask } from './sub-task.entity';

describe('SubTaskEntity', () => {
  describe('create', () => {
    it('should be create a new instance of sub task', () => {
      const newSubTask = SubTask.create({
        title: 'Writing this test',
        taskId: '123',
      });

      expect(newSubTask).toBeInstanceOf(SubTask);
    });
  });

  describe('changeStatus', () => {
    it('should be change sub task status to completed', () => {
      const newSubTask = SubTask.create({
        title: 'Writing this test',
        taskId: '123',
      });

      newSubTask.changeStatus(TaskStatus.Completed);

      expect(newSubTask.status).toBe(TaskStatus.Completed);
    });
  });
});
