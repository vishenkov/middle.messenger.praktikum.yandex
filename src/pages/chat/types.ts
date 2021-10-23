import { Props } from '../../lib/types';
import { Chat, User } from '../../api/types';

export type ChatProps = Props & {
  id: number,
  user?: User,
  chats: Chat[]
};
