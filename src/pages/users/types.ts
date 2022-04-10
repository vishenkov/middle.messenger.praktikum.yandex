import { User } from '../../api/types';
import { Props } from '../../lib/types';

export type UsersProps = Props & {
  users?: User[];
  id: number,
  user: User,
  chatUsers: User[]
};
