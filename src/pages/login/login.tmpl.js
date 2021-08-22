import * as styles from './login.css';

export default () => `
  <Container modifier="centered">
    <div class="${styles.root}">
      <Paper>
        <Input ctx={{ loginInput }} />
        <Button ctx={{ button }} />
      </Paper>
    </div>
  </Container>
`;
