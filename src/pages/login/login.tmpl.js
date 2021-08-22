import * as styles from './login.css';
import * as typographyStyles from '../../styles/typography.css';

export default () => `
  <Container modifier="centered">
    <div class="${styles.root}">
      <Paper>
        <h2 class="${typographyStyles.h3}">
          Вход
        </h2>
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
