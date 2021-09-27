import * as styles from './chats.css';

export default () => `
  <main class="${styles.root}">
    <div class="${styles.chatsRoot}">
      <div class="${styles.toolbar}">
        <div class="${styles.avatarRoot}">
          <Avatar s="true" />
          <Typography className="${styles.toolbarItem}" variant="body">
            John Doe
          </Typography>
        </div>

        <Link
          className="${styles.toolbarItem}"
          text="Профиль"
          href="/profile"
        />
      </div>

      <div class="${styles.chatList}">
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
