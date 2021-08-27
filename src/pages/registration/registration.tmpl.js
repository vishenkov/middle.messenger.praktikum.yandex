import * as styles from './registration.css';

export default `
  <Container modifier="centered, min100vh">
    <div class="${styles.root}">
      <Paper>
        <Typography modifier="h3, gutterBottom">
          {{ title }}
        </Typography>

        <Input
          modifier="fullWidth, gutterBottom"
          ctx={{ emailInput }}
        />
        <Input
          modifier="fullWidth, gutterBottom"
          ctx={{ loginInput }}
        />
        <Input
          modifier="fullWidth, gutterBottom"
          ctx={{ nameInput }}
        />
        <Input
          modifier="fullWidth, gutterBottom"
          ctx={{ secondNameInput }}
        />
        <Input
          modifier="fullWidth, gutterBottom"
          ctx={{ passwordInput }}
        />
        <Input
          modifier="fullWidth, gutterBottom"
          ctx={{ passwordRepeatInput }}
        />
        <Input
          modifier="fullWidth, gutterBottom"
          ctx={{ phoneInput }}
        />

        <Button
          modifier="fullWidth, gutterBottom"
          ctx={{ createAccButton }}
        />
        <Link
         modifier="fullWidth"
         ctx={{ loginLink }}
       />
      </Paper>
    </div>
  </Container>
`;
