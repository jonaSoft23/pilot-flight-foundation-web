import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Grid, Card, Alert, Snackbar, MenuItem } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Scrollbar } from "src/components/scrollbar";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/react-hooks";
import addMemberMutation from "@/mutations/addMemberMutation";
import { useQuery } from "@apollo/react-hooks";
import getAllVSLAs from "@/queries/getVSLAs";
import { Progress } from "@/components/progress";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("This is a required field"),
  lastName: yup.string().required("This is a required field"),
  contact: yup.string().required("This is a required field"),
  gender: yup.string().required("This is a required field"),
  age: yup.string().required("This is a required field"),
  address: yup.string().required("This is a required field"),
  vsla: yup.string().required("This is a required field"),
});

export const MembersForm = () => {
  const {
    loading: getVslasLoading,
    error: getVslasError,
    data: VslasResult,
  } = useQuery(getAllVSLAs);

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

  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false); //open success alert
  const [displayFailure, setDisplayFailure] = useState(false); //open failure alert

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      //Post member details to database
      // const Result = await createMember({
      //   variables: {
      //     FirstName: data.firstName,
      //     LastName: data.lastName,
      //     Contact: data.contact,
      //     Gender: data.gender,
      //     VSLA: data.vsla
      //   },
      // });

      console.log(JSON.stringify(data, null, 2));

      if (!mutationError) {
        console.log(`Sucessfully admitted ${data.lastName}`);

        //Show success alert
        setOpen(true);

        //Reset form
        reset();
      }
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(mutationError, null, 2));

      //Show Failure alert
      setDisplayFailure(true);
    }
  };

  if (getVslasLoading)
    return (
      <Progress />
    );

  if (getVslasError) return <p> There was an error </p>;

  const vslaList = VslasResult?.vslas?.data;

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
              <Grid item xs={12} sm={6} md={4}>
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
              <Grid item xs={12} sm={6} md={4}>
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
              <Grid item xs={8} sm={6} md={4}>
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
              <Grid item xs={8} md={6}>
                <TextField
                  id="age"
                  label="Age"
                  variant="outlined"
                  fullWidth
                  {...register("age")}
                  error={errors.age ? true : false}
                  helperText={errors?.age?.message}
                />
              </Grid>
              <Grid item xs={8} md={6}>
                <TextField
                  inputProps={{ "aria-label": "Without label" }}
                  select
                  variant="outlined"
                  label="Gender"
                  fullWidth
                  required
                  {...register("gender")}
                >
                  <MenuItem value="">
                    <em>Select gender</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={8} md={6}>
                <TextField
                  id="address"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  {...register("address")}
                  error={errors.address ? true : false}
                  helperText={errors?.address?.message}
                />
              </Grid>

              <Grid item xs={8} md={6}>
                <TextField
                  inputProps={{ "aria-label": "Without label" }}
                  select
                  id="vsla"
                  label="VSLA"
                  variant="outlined"
                  fullWidth
                  {...register("vsla")}
                  error={errors.vsla ? true : false}
                  helperText={errors?.vsla?.message}
                >
                  <MenuItem value="">
                    {" "}
                    <em>Select VSLA</em>
                  </MenuItem>
                  {vslaList.map((item) => {
                    return (
                      <MenuItem key={item?.id} value={item?.attributes?.name}>
                        {item?.attributes?.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ py: 4 }}>
              <Grid item xs={8} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || !isValid}
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
