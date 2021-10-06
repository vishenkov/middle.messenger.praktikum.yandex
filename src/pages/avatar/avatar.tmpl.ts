import * as styles from './avatar-page.css';

export default () => `
  <Container centered="true" min100vh="true">
    <div class="${styles.root}">
      <Paper>
        <Typography
          variant="h3"
          gutterBottom="true"
        >
          Сменить аватар
        </Typography>
        <div class="${styles.inputsRoot}">
          <form method="POST" onSubmit={{handleSubmit}}>
            <Alert
              error={{requestError}}
            />

            <input 
              class="${styles.fileInput}"
              name="avatar"
              type="file" 
              accept="image/*"
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
