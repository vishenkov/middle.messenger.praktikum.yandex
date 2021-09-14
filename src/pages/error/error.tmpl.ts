import { Props } from '../../lib/base-component';
import * as styles from './error.css';

export default (props: Props) => `
  <Container centered="true" min100vh="true">
    <div class="${styles.root}">
      <Paper centered="true">
        <Typography
          variant="h3"
          gutterBottom="true"
        >
          ${props.errorCode}
        </Typography>

        <Typography
          variant="body"
          gutterBottom="true"
        >
          ${props.subtitle}
        </Typography>

        <Button
          gutterBottom="true"
          label="Назад к чатам"
        />
      </Paper>
    </div>
  </Container>
`;
