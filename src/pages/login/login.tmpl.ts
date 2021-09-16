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
          <Input
            fullWidth="true"
            gutterBottom="true"
            name="login"
            placeholder="Логин"
            validate="login"
          />
          <Input
            fullWidth="true"
            gutterBottom="true"
            name="password"
            placeholder="Пароль"
            validate="password"
            type="password"
          />

          <Button
            type="submit"
            fullWidth="true"
            gutterBottom="true"
            label="Войти"
            onClick={{handleClick}}
          />
        </form>

        <Link
         fullWidth="true"
         text="Создать аккаунт"
         href="/registration"
       />
      </Paper>
    </div>
  </Container>
`;
