export enum Status {
  TODO,
  DONE
}

export const BoardStatus = [Status.TODO, Status.DONE];

export type Task = {
  id: number;
  description: string;
  status: Status;
};

export type TaskResponse = {
  id: number;
  title: string;
  state: string;
};
