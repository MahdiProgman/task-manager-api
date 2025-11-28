import { TaskStatus, TaskPriority } from './enums';
import { SubTask } from './sub-task.entity';

interface TaskProps {
  id?: string;
  title: string;
  description: string;
  status?: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  userId: string;
  categoryId: string;
  createdAt?: Date;

  subTasks?: SubTask[];
}

export class Task {
  public readonly id?: string;
  public title: string;
  public description: string;
  private _status: TaskStatus;
  private _priority: TaskPriority;
  public dueDate: Date;
  public readonly userId: string;
  private _categoryId: string;
  public readonly createdAt?: Date;

  private _subTasks: SubTask[];

  constructor(props: TaskProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this._status = props.status ?? TaskStatus.Pending;
    this._priority = props.priority;
    this.dueDate = props.dueDate;
    this.userId = props.userId;
    this._categoryId = props.categoryId;
    this.createdAt = props.createdAt;

    this._subTasks = props.subTasks ?? [];
  }

  static create(props: TaskProps) {
    return new Task(props);
  }

  get status() {
    return this._status;
  }

  get priority() {
    return this._priority;
  }

  get subTasks() {
    return this._subTasks;
  }

  get categoryId() {
    return this._categoryId;
  }

  public changeStatus(status: TaskStatus) {
    this._status = status;
  }

  public changePriority(priority: TaskPriority) {
    this._priority = priority;
  }

  public changeCategory(categoryId: string) {
    this._categoryId = categoryId;
  }

  public addSubTask(subTask: SubTask) {
    this.subTasks.push(subTask);
  }

  public removeSubTask(subTaskId: string) {
    this._subTasks = this.subTasks.filter(
      (subTask) => subTask.id !== subTaskId,
    );
  }
}
