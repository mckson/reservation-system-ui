import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
	Container,
	makeStyles,
	Typography,
	Grid,
	Button,
	Link,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import MyTextField from '../../Common/MyTextField';
import axiosInstance from '../../Common/API';

const validationSchema = Yup.object({
	email: Yup.string().email('Invalid email adress').required('Required'),

	password: Yup.string()
		.min(8, 'Must be 8 characters or more')
		.required('Required'),
});

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(10),
	},
	submit: {
		margin: theme.spacing(5, 0, 2),
	},
}));

const SignIn = () => {
	const classes = useStyles();
	const [error, setError] = useState('');

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<div className={classes.form}>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={validationSchema}
						onSubmit={async (values) => {
							const request = {
								Email: values.email,
								Password: values.password,
							};

							await axiosInstance
								.post('/Account/SignIn', request)
								.then((response) => {
									console.log(response);
								})
								.catch((error) => {
									if (error.response) {
										/*
										 * The request was made and the server responded with a
										 * status code that falls out of the range of 2xx
										 */
										console.log(error.response.data);
										console.log(error.response.status);
										console.log(error.response.headers);
										setError(error.response.data.message);
									} else if (error.request) {
										/*
										 * The request was made but no response was received, `error.request`
										 * is an instance of XMLHttpRequest in the browser and an instance
										 * of http.ClientRequest in Node.js
										 */
										console.log(error.request);
									} else {
										// Something happened in setting up the request and triggered an Error
										console.log('Error', error.message);
									}
									console.log(error.config);
								});
						}}
					>
						<Form>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<MyTextField
										required
										fullWidth
										label='Email'
										name='email'
										type='email'
										placeholder='email@email.com'
									/>
								</Grid>
								<Grid item xs={12}>
									<MyTextField
										required
										fullWidth
										label='Password'
										name='password'
										type='password'
									/>
								</Grid>

								<Grid item xs={12}>
									{error !== '' ? (
										<Alert
											fullWidth
											variant='outlined'
											severity='error'
											action={
												<IconButton
													aria-label='close'
													color='inherit'
													size='small'
													onClick={() => {
														setError('');
													}}
												>
													<CloseIcon fontSize='inherit' />
												</IconButton>
											}
										>
											{error}
										</Alert>
									) : null}
								</Grid>

								<Button
									fullWidth
									className={classes.submit}
									variant='contained'
									type='submit'
									color='primary'
								>
									Sign In
								</Button>

								<Grid container justify='flex-end'>
									<Grid item>
										<Link href='/SignUp' variant='body2'>
											Don't have an account? Sign up
										</Link>
									</Grid>
								</Grid>
							</Grid>
						</Form>
					</Formik>
				</div>
			</div>
		</Container>
	);
};

export default SignIn;
