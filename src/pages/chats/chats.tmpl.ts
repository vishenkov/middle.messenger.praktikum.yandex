import * as styles from './chats.css';

export default (props) => `
  <main class="${styles.root}">
    <div class="${styles.chatsRoot}">
      <div class="${styles.toolbar}">
        <ListItem
          avatar="${props.user?.avatar}"
          title="${props.user?.first_name} ${props.user?.second_name}"
          href="/settings"
        />
      </div>

      <div class="${styles.chatList}">
        <Link
          className="${styles.chatListItem}"
          text="Новый чат"
          href="/messenger/new"
        />
        ${props.chats.map((chat) => (`
          <ListItem
            title="${chat.title}"
            href="/messenger/${chat.id}"
          />
        `)).join(' ')}

      </div>
    </div>

    <div class="${styles.chatContainer}">
      <div class="${styles.toolbar} ${styles.toolbar__right}">
        <Link
          className="${styles.toolbarItem}"
          text="Выйти"
          onClick={{handleLogoutClick}}
        />
      </div>

      <div class="${styles.chatRoom}">
        <div class="${styles.chatRoomDummy}">
          <Paper centered="true">
            <Typography
              variant="h5"
              gutterBottom="true"
            >
              Выберите чат слева или создайте новый!
            </Typography>

            <Link
              text="Новый чат"
              href="/messenger/new"
            />
          </Paper>
        </div>
      </div>
    </div>
  </main>
`;
