import * as styles from './registration.css';

export default () => `
  <Container centered="true" min100vh="true">
      <div class="${styles.root}">
        <Paper>
          <Typography
            variant="h3"
            gutterBottom="true"
          >
            Регистрация
          </Typography>

          <Input
            fullWidth="true"
            gutterBottom="true"
            name="email"
            placeholder="Почта"
          />
          <Input
            fullWidth="true"
            gutterBottom="true"
            name="login"
            placeholder="Логин"
          />
          <Input
            fullWidth="true"
            gutterBottom="true"
            name="first_name"
            placeholder="Имя"
          />
          <Input
            fullWidth="true"
            gutterBottom="true"
            name="second_name"
            placeholder="Фамилия"
          />
          <Input
            fullWidth="true"
            gutterBottom="true"
            name="password"
            placeholder="Пароль"
          />
          <Input
            fullWidth="true"
            gutterBottom="true"
            name="repeat-password"
            placeholder="Повтор пароля"
          />
          <Input
            fullWidth="true"
            gutterBottom="true"
            name="phone"
            placeholder="Телефон"
          />

          <Button
            fullWidth="true"
            gutterBottom="true"
            label="Создать аккаунт"
          />
          <Link
          fullWidth="true"
          text="Войти"
          href="/"
        />
        </Paper>
      </div>
    </Container>
`;
