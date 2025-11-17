import { TaskStatus } from './enums';

interface SubTaskProps {
  id?: string;
  title: string;
  status?: TaskStatus;
  taskId: string;
  createdAt?: Date;
}

export class SubTask {
  public id?: string;
  public title: string;
  private _status: TaskStatus;
  public readonly taskId: string;
  public readonly createdAt?: Date;

  constructor(props: SubTaskProps) {
    this.id = props.id;
    this.title = props.title;
    this._status = props.status ?? TaskStatus.Pending;
    this.taskId = props.taskId;
    this.createdAt = props.createdAt;
  }

  static create(props: SubTaskProps) {
    return new SubTask(props);
  }

  public changeStatus(status: TaskStatus) {
    this._status = status;
  }

  get status() {
    return this._status;
  }
}
