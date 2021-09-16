import * as styles from './profile.css';

export default () => `
  <Container centered="true" min100vh="true">
    <div class="${styles.root}">
      <Paper>
        <div class="${styles.avatarRoot}">
          <Avatar gutterBottom="true" />
          <Typography variant="h4">
            John Doe
          </Typography>
        </div>
        
        <div class="${styles.inputsRoot}">
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
              name="nick_name"
              placeholder="Имя в чате"
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
