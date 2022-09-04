export enum Status {
  TODO,
  IN_PROGRESS,
  DONE
}

export const BoardStatus = [Status.TODO, Status.IN_PROGRESS, Status.DONE];

export type Task = {
  id: number;
  description: string;
  status: Status;
};
