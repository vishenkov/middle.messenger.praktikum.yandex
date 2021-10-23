import { Props } from '../../lib/base-component';
import styles from './error.css';

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

        <Link
          gutterBottom="true"
          text="Назад к чатам"
          href="/messenger"
        />
      </Paper>
    </div>
  </Container>
`;
