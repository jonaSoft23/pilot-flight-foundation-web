import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, Grid, Card } from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const MembersForm = () => {
  return (
    <>
      <Card>
        <Scrollbar>
          <Box
            component="form"
            sx={{ minWidth: 800, py: 6, px: 4 }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={3}>
              <Grid item lg={12}>
                <TextField id="name" label="Name" variant="outlined" />
              </Grid>
              <Grid item xs={8}>
                <TextField id="email" label="Email" variant="outlined" />
              </Grid>
              <Grid item xs={8}>
                <TextField id="message" label="Message" variant="outlined" />
              </Grid>
              <Grid item xs={8}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Scrollbar>
      </Card>
    </>
  );
};
