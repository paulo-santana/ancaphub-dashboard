import React, { useRef } from "react";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Container,
  Link,
  CssBaseline,
} from "@material-ui/core";
import { TextField } from 'unform-material-ui';
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { authUserRequest } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  errorMessage: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },
}));

function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const signupFormRef = useRef(null);

  async function handleSubmit(data) {
    console.log(data)
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("E-mail inválido")
          .required("O campo e-mail é obrigatório!"),
        password: Yup.string().required("O campo senha é obrigatório!"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(authUserRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        signupFormRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Form onSubmit={handleSubmit} ref={signupFormRef}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField name="email" type="email" label="E-mail" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  type="password"
                  label="Senha"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Entrar
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link
                  component={RouterLink}
                  to="/login"
                  underline="none"
                  color="textPrimary"
                >
                  Esqueceu a senha?
                </Link>
              </Grid>
            </Grid>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default SignIn;
