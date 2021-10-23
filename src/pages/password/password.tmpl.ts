import * as styles from './password.css';

export default () => `
  <Container centered="true" min100vh="true">
    <div class="${styles.root}">
      <Paper>
        <Typography
          variant="h3"
          gutterBottom="true"
        >
          Сменить пароль
        </Typography>
        <div class="${styles.inputsRoot}">
          <form onSubmit={{handleSubmit}}>
            <Alert
              error={{requestError}}
            />

            <Input
              fullWidth="true"
              gutterBottom="true"
              name="oldPassword"
              placeholder="Старый пароль"
              formValues={{formValues}}
              formErrors={{formErrors}}
              type="password"
              validate="password"
            />
            <Input
              fullWidth="true"
              gutterBottom="true"
              name="newPassword"
              placeholder="Новый пароль"
              formValues={{formValues}}
              formErrors={{formErrors}}
              type="password"
              validate="password"
            />

            <Button
              type="submit"
              fullWidth="true"
              gutterBottom="true"
              label="Сохранить"
            />
          </form>
        </div>

        <Link
          fullWidth="true"
          text="Назад"
          href="/settings"
        />
      </Paper>
    </div>
  </Container>
`;
