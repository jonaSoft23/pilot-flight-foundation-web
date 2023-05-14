import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, Grid, Card, Alert, Snackbar } from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/react-hooks";
import addMemberMutation from "@/mutations/addMemberMutation";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("This is a required field"),

  lastName: yup.string().required("This is a required field"),

  contact: yup.string().required("This is a required field"),
});

export const MembersForm = () => {
  const [createMember, { error: mutationError }] =
    useMutation(addMemberMutation);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [open, setOpen] = useState(false); //open success alert
  const [displayFailure, setDisplayFailure] = useState(false); //open failure alert

  const onSubmit = async (data) => {
    try {
      //Post member details to database
      const Result = await createMember({
        variables: {
          FirstName: data.firstName,
          LastName: data.lastName,
          Contact: data.contact
        },
      });

      console.log(json.stringify(Result));

      if (!mutationError) {
        console.log(`Sucessfully admitted ${data.lastName}`);

        //Show success alert
        setOpen(true);

        //Reset form
        reset();
      }
    } catch (e) {
      console.log(JSON.stringify(mutationError, null, 2));

      //Show Failure alert
      setDisplayFailure(true);
    }
  };

  return (
    <>
      <Card>
        <Scrollbar>
          <Box
            component="form"
            sx={{ minWidth: 800, py: 6, px: 4 }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  {...register("firstName")}
                  error={errors.firstName ? true : false}
                  helperText={errors?.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  {...register("lastName")}
                  error={errors.lastName ? true : false}
                  helperText={errors?.lastName?.message}
                />
              </Grid>
              <Grid item xs={8} md={6}>
                <TextField
                  id="contact"
                  label="Contact"
                  variant="outlined"
                  fullWidth
                  {...register("contact")}
                  error={errors.contact ? true : false}
                  helperText={errors?.contact?.message}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ py: 4 }}>
              <Grid item xs={8} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || isValid}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Scrollbar>
      </Card>
      <Snackbar
        sx={{ zIndex: 100000 }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          Member registered successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        sx={{ zIndex: 100000 }}
        open={displayFailure}
        autoHideDuration={6000}
        onClose={() => setDisplayFailure(false)}
      >
        <Alert onClose={() => setDisplayFailure(false)} severity="warning">
          Member not Registered!
        </Alert>
      </Snackbar>
    </>
  );
};
