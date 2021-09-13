import * as styles from './chats.css';

export default () => `
  <Container centered="true" min100vh="true">
    <div class="${styles.root}">
      <Paper centered="true">
        <Typography variant="h3" gutterBottom="true">
          WORK IN PROGRESS
        </Typography>

        <Typography variant="body" gutterBottom="true">
          Скоро здесь будут чаты
        </Typography>

        <Button
          modifier="fullWidth"
          label="Назад"
        />
      </Paper>
    </div>
  </Container>
`;
