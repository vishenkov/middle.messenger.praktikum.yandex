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

          <form method="POST" onSubmit={{handleSubmit}}>
            <Input
              fullWidth="true"
              gutterBottom="true"
              name="email"
              placeholder="Почта"
              validate="email"
            />
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
              name="first_name"
              placeholder="Имя"
              validate="first_name"
            />
            <Input
              fullWidth="true"
              gutterBottom="true"
              name="second_name"
              placeholder="Фамилия"
              validate="second_name"
            />
            <Input
              fullWidth="true"
              gutterBottom="true"
              name="password"
              placeholder="Пароль"
              validate="password"
              type="password"
            />
            <Input
              fullWidth="true"
              gutterBottom="true"
              name="repeat-password"
              placeholder="Повтор пароля"
              validate="password"
              type="password"
            />
            <Input
              fullWidth="true"
              gutterBottom="true"
              name="phone"
              placeholder="Телефон"
              validate="phone"
            />

            <Button
              type="submit"
              fullWidth="true"
              gutterBottom="true"
              label="Создать аккаунт"
            />
          </form>

          <Link
            fullWidth="true"
            text="Войти"
            href="/"
          />
        </Paper>
      </div>
    </Container>
`;
