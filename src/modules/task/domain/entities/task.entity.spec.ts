import { TaskPriority, TaskStatus } from './enums';
import { SubTask } from './sub-task.entity';
import { Task } from './task.entity';

describe('TaskEntity', () => {
  describe('task', () => {
    describe('create', () => {
      it('should be create a new instance of task', () => {
        const newTask = Task.create({
          title: 'Writing this test',
          description: 'this test is very important',
          priority: TaskPriority.High,
          dueDate: new Date(),
          userId: '123',
          categoryId: '123',
        });

        expect(newTask).toBeInstanceOf(Task);
      });

      it('should be create a new instance of task with sub tasks', () => {
        const newSubTask = new SubTask({
          title: 'Writing this test',
          taskId: '123',
        });

        const newTask = Task.create({
          title: 'Writing this test',
          description: 'this test is very important',
          priority: TaskPriority.High,
          dueDate: new Date(),
          userId: '123',
          categoryId: '123',

          subTasks: [newSubTask],
        });

        expect(newTask.subTasks[0]).toBe(newSubTask);
      });
    });

    describe('changePriority', () => {
      it('should be change task priority to low', () => {
        const newTask = Task.create({
          title: 'Writing this test',
          description: 'this test is very important',
          priority: TaskPriority.High,
          dueDate: new Date(),
          userId: '123',
          categoryId: '123',
        });

        // Oops, it was valuable
        newTask.changePriority(TaskPriority.Low);

        expect(newTask.priority).toBe(TaskPriority.Low);
      });
    });

    describe('changeStatus', () => {
      it('should be change status to completed', () => {
        const newTask = Task.create({
          title: 'Writing this test',
          description: 'this test is very important',
          priority: TaskPriority.High,
          dueDate: new Date(),
          userId: '123',
          categoryId: '123',
        });

        newTask.changeStatus(TaskStatus.Completed);

        expect(newTask.status).toBe(TaskStatus.Completed);
      });
    });
  });

  describe('sub task', () => {
    describe('addSubTask', () => {
      it('should be add a new sub task for task', () => {
        const newTask = Task.create({
          title: 'Writing this test',
          description: 'this test is very important',
          priority: TaskPriority.High,
          dueDate: new Date(),
          userId: '123',
          categoryId: '123',
        });

        const newSubTask = SubTask.create({
          title: 'Writing this test',
          taskId: '123',
        });

        newTask.addSubTask(newSubTask);

        expect(newTask.subTasks[0].title).toBe('Writing this test');
      });
    });

    describe('removeSubTask', () => {
      it('should be remove sub task from task', () => {
        const newSubTask = SubTask.create({
          id: '123',
          title: 'Writing this test',
          taskId: '123',
        });

        const newTask = Task.create({
          title: 'Writing this test',
          description: 'this test is very important',
          priority: TaskPriority.High,
          dueDate: new Date(),
          userId: '123',
          categoryId: '123',

          subTasks: [newSubTask],
        });

        newTask.removeSubTask(newSubTask.id);

        expect(newTask.subTasks.length).toEqual(0);
      });
    });
  });
});
