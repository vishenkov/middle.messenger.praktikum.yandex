import BaseComponent from '../../lib/base-component';
import getProfileTmpl from './profile.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';

class Profile extends BaseComponent {
  constructor() {
    super({}, {
      Container,
      Link,
      Avatar,
      Button,
      Input,
      Typography,
      Paper,
      Native,
    });
  }

  render() {
    return getProfileTmpl();
  }
}

export default Profile;
