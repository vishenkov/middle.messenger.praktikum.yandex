import * as styles from './new-chat.css';

export default () => `
  <Container centered="true" min100vh="true">
    <div class="${styles.root}">
      <Paper>
        <Typography
          variant="h3"
          gutterBottom="true"
        >
          Создать чат
        </Typography>
        <div class="${styles.inputsRoot}">
          <form onSubmit={{handleSubmit}}>
            <Alert
              error={{requestError}}
            />

            <Input
              fullWidth="true"
              gutterBottom="true"
              name="title"
              placeholder="Название чата"
              formValues={{formValues}}
              formErrors={{formErrors}}
            />

            <Button
              type="submit"
              fullWidth="true"
              gutterBottom="true"
              label="Создать"
            />
          </form>
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
