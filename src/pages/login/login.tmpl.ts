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
        <Input
          fullWidth="true"
          gutterBottom="true"
          name="login"
          placeholder="Логин"
        />
        <Input
          fullWidth="true"
          gutterBottom="true"
          name="password"
          placeholder="Пароль"
        />

        <Button
          fullWidth="true"
          gutterBottom="true"
          label="Войти"
        />

        <Link
         fullWidth="true"
         text="Создать аккаунт"
         href="/registration"
       />
      </Paper>
    </div>
  </Container>
`;
