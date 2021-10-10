import * as styles from './chats.css';

export default (props) => `
  <main class="${styles.root}">
    <div class="${styles.chatsRoot}">
      <div class="${styles.toolbar}">
        <div class="${styles.avatarRoot}">
          <Avatar s="true" src="${props.user?.avatar}" />
          <Typography className="${styles.toolbarItem}" variant="body">
            ${props.user?.first_name}
            ${props.user?.second_name}
          </Typography>
        </div>

        <Link
          className="${styles.toolbarItem}"
          text="Профиль"
          href="/settings"
        />

        <Link
          className="${styles.toolbarItem}"
          text="Выйти"
          onClick={{handleLogoutClick}}
        />
      </div>

      <div class="${styles.chatList}">
        <Link
          className="${styles.chatListItem}"
          text="Новый чат"
          href="/messenger/new"
        />

        <div class="${styles.chatListItem}">
          <div class="${styles.avatarRoot}">
            <Avatar s="true" />
            <Typography className="${styles.toolbarItem}" variant="body">
              Chat 1
            </Typography>
          </div>
        </div>

        <div class="${styles.chatListItem}">
          <div class="${styles.avatarRoot}">
            <Avatar s="true" />
            <Typography className="${styles.toolbarItem}" variant="body">
              Chat 2
            </Typography>
          </div>
        </div>
      </div>
    </div>

    <div class="${styles.chatContainer}">
      <div class="${styles.toolbar}">
      </div>

      <div class="${styles.chatRoom}">
        <div class="${styles.chatRoomDummy}">
          <Paper centered="true">
            <Typography
              variant="h4"
              gutterBottom="true"
            >
              Chat dummy
            </Typography>

            <Link
              href="/"
              text="Назад"
            />
          </Paper>
        </div>
      </div>

      <form method="POST" onSubmit={{handleSubmit}}>
        <div class="${styles.messageRoot}">
          <Input
            fullWidth="true"
            name="message"
            placeholder="Сообщение"
            validate="message"
          />

          <Button
            type="submit"
            label="Отправить"
          />
        </div>
      </form>
    </div>
  </main>
`;
