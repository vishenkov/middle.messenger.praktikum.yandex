import * as styles from './profile.css';

export default ({ user }) => `
  <Container centered="true" min100vh="true">
    <div class="${styles.root}">
      <Paper>
        <div class="${styles.avatarRoot}">
          <Avatar gutterBottom="true" />
          <Typography variant="h4">
            ${user?.first_name} ${user?.second_name}
          </Typography>
        </div>
        
        <div class="${styles.inputsRoot}">
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
              name="display_name"
              formValues={{formValues}}
              formErrors={{formErrors}}
              placeholder="Имя в чате"
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
              label="Сохранить"
            />
          </form>
        </div>

        <Button
          fullWidth="true"
          gutterBottom="true"
          label="Сменить пароль"
        />

        <Link
          fullWidth="true"
          text="Назад"
          href="/"
        />
      </Paper>
    </div>
  </Container>
`;
