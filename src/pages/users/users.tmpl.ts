import * as styles from './users.css';

export default (props) => `
  <Container centered="true" min100vh="true">
    <div class="${styles.root}">
      <Paper>
        <Typography
          variant="h4"
          gutterBottom="true"
        >
          Пользователи
        </Typography>

        <Typography
          variant="h5"
          gutterBottom="true"
        >
          Удалить пользователя
        </Typography>
        <div class="${styles.users}">
            ${Object.values(props.chatUsers)?.map((user) => `
              <ListItem
                id="${user.id}"
                title="${user?.first_name}"
                avatar="${user.avatar}"
                onClick={{handleDeleteUserClick}}
              />
            `).join('')} 
          </div>

        <div class="${styles.divider}"></div>

        <div class="${styles.formRoot}">
          <Typography
            variant="h5"
            gutterBottom="true"
          >
            Добавить пользователя
          </Typography>
          <form method="POST" onSubmit={{handleSubmit}}>
            <Alert
              error={{requestError}}
            />

            <div class="${styles.input}">
              <Input
                fullWidth="true"
                name="login"
                placeholder="Поиск по логину"
                formValues={{formValues}}
                formErrors={{formErrors}}
              />

              <Button
                type="submit"
                label="Найти"
              />
            </div>
          </form>

          <div class="${styles.users}">
            ${props.users.map((user) => `
              <ListItem
                id="${user.id}"
                title="${user?.first_name}"
                avatar="${user.avatar}"
                onClick={{handleUserClick}}
              />
            `).join('')} 
          </div>
        </div>

        <Link
          fullWidth="true"
          text="Назад"
          href="/"
        />
      </Paper>
    </div>
  </Container>
`;
