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
            <Alert
              error={{requestError}}
            />

            <Input
              fullWidth="true"
              gutterBottom="true"
              name="email"
              placeholder="Почта"
              formValues={{formValues}}
              formErrors={{formErrors}}
              validate="email"
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
              name="first_name"
              placeholder="Имя"
              formValues={{formValues}}
              formErrors={{formErrors}}
              validate="first_name"
            />
            <Input
              fullWidth="true"
              gutterBottom="true"
              name="second_name"
              placeholder="Фамилия"
              formValues={{formValues}}
              formErrors={{formErrors}}
              validate="second_name"
            />
            <Input
              fullWidth="true"
              gutterBottom="true"
              name="password"
              placeholder="Пароль"
              type="password"
              formValues={{formValues}}
              formErrors={{formErrors}}
              validate="password"
            />
            <Input
              fullWidth="true"
              gutterBottom="true"
              name="repeat_password"
              placeholder="Повтор пароля"
              type="password"
              formValues={{formValues}}
              formErrors={{formErrors}}
            />
            <Input
              fullWidth="true"
              gutterBottom="true"
              name="phone"
              placeholder="Телефон"
              formValues={{formValues}}
              formErrors={{formErrors}}
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
