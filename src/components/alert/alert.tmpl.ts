import { Props } from '../../lib/base-component';

const getAlertTmpl = ({ error }: Props) => (error
  ? `
  <div>
    <Typography
      gutterBottom="true"
      error="true"
    >
      ${error}
    </Typography>
  </div>
`
  : '<div></div>');

export default getAlertTmpl;
