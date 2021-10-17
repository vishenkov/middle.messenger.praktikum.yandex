import * as styles from './login.css';

export default () => `
  <Container centered="true" min100vh="true">
    <div class="${styles.root}">
      <Paper>
        <Typography
          variant="h3"
          gutterBottom="true"
        >
          Вход
        </Typography>

        <form method="POST" onSubmit={{handleSubmit}}>
          <Alert
            error={{requestError}}
          />

          <Input
            fullWidth="true"
            gutterBottom="true"
            name="login"
            placeholder="Логин"
            formValues={{formValues}}
            formErrors={{formErrors}}
            validate="login"
          />
          <Input
            fullWidth="true"
            gutterBottom="true"
            name="password"
            placeholder="Пароль"
            type="password"
            formValues={formValues}}
            formErrors={{formErrors}}
            validate="password"
          />

          <Button
            type="submit"
            fullWidth="true"
            gutterBottom="true"
            label="Войти"
          />
        </form>

        <Link
         fullWidth="true"
         text="Создать аккаунт"
         href="/sign-up"
       />
      </Paper>
    </div>
  </Container>
`;
