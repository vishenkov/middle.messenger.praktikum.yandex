import * as styles from './profile.css';

export default `
  <Container modifier="centered, min100vh">
    <div class="${styles.root}">
      <Paper>
        <div class="${styles.avatarRoot}">
          <Avatar modifier="gutterBottom" />
          <Typography modifier="h4">
            {{ fullName }}
          </Typography>
        </div>
        
        <div class="${styles.inputsRoot}">
          <Input
            modifier="fullWidth, gutterBottom"
            ctx={{ emailInput }}
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
            ctx={{ nickNameInput }}
          />
          <Input
            modifier="fullWidth, gutterBottom"
            ctx={{ phoneInput }}
          />
        </div>

        <Button
          modifier="fullWidth, gutterBottom"
          ctx={{ saveButton }}
        />

        <Button
          modifier="fullWidth, secondary, gutterBottom"
          ctx={{ changePasswordButton }}
        />

        <Link
         modifier="fullWidth"
         ctx={{ backLink }}
       />
      </Paper>
    </div>
  </Container>
`;
