import { User } from '../../api/types';
import { Props } from '../../lib/types';

export type ProfileProps = Props & {
  user: User
};
