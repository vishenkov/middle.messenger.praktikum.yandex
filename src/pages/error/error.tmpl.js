import * as styles from './error.css';

export default `
  <Container modifier="centered, min100vh">
    <div class="${styles.root}">
      <Paper modifier="centered">
        <Typography modifier="h3, gutterBottom">
          {{ title }}
        </Typography>

        <Typography modifier="body, gutterBottom">
          {{ subtitle }}
        </Typography>

        <Button
          modifier="fullWidth"
          ctx={{ backButton }}
        />
      </Paper>
    </div>
  </Container>
`;
