import { Chat, User } from '../../api/types';
import { Props } from '../../lib/types';

export type ChatsProps = Props & {
  user?: User,
  chats: Chat[]
};
