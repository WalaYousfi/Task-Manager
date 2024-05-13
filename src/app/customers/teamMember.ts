import { Task } from '../kanban/board.model';

export interface teamMember {
  id: string;
  name: string;
  email: string;
  position: string;
  tasks?: Task[];
}
