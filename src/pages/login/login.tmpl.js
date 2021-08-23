import * as styles from './login.css';

export default `
  <Container modifier="centered">
    <div class="${styles.root}">
      <Paper>
        <Typography modifier="h3, gutterBottom">
          Вход
        </Typography>
        <Input
          modifier="fullWidth, gutterBottom"
          ctx={{ loginInput }}
        />
        <Input
          modifier="fullWidth, gutterBottom"
          ctx={{ passwordInput }}
        />

        <Button
          modifier="fullWidth, gutterBottom"
          ctx={{ loginButton }}
        />
        <Button
          modifier="fullWidth, secondary"
          ctx={{ createAccButton }}
        />
      </Paper>
    </div>
  </Container>
`;
