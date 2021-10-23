import * as styles from './chat.css';

export default (props) => `
  <main class="${styles.root}">
    <div class="${styles.chatContainer}">
      <div class="${styles.toolbar}">
        <div class="${styles.toolbar__left}">
          <ListItem
            avatar="${props.user?.avatar}"
            title="${props.user?.first_name} ${props.user?.second_name}"
            href="/settings"
          />

          <Link
            className="${styles.toolbarItem}"
            text="К чатам"
            href="/messenger"
          />
        </div>

        <div class="${styles.toolbar__right}">
          <Link
            className="${styles.toolbarItem}"
            text="Пользователи"
            href="/messenger/${props.id}/users"
          />

          <Link
            className="${styles.toolbarItem}"
            text="Выйти"
            onClick={{handleLogoutClick}}
          />
        </div>
      </div>

      <div class="${styles.chatRoom}">
        <Messages
          messages="{{messages}}"
        />
      </div>

      <form onSubmit={{handleSubmit}}>
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
