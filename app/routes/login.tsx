import type { ActionArgs, LinksFunction } from '@remix-run/node';
import styles from '~/styles/login.css';
import { Form, useActionData } from '@remix-run/react';
import cinemaImg from '../../public/images/cinema.jpg';

import { badRequest } from '~/utils/request.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

function validateUsername(username: unknown) {
  if (typeof username !== 'string' || username.length < 3) {
    return `Usernames is incorrect`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 6) {
    return `Passwords is incorrect`;
  }
}

function validateUrl(url: string) {
  let urls = ['/', 'https://remix.run'];
  if (urls.includes(url)) {
    return url;
  }
  return '/';
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const username = form.get('username');
  const password = form.get('password');
  const redirectTo = validateUrl(form.get('redirectTo') || '/');
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  // login to get the user
  // if there's no user, return the fields and a formError
  // if there is a user, create their session and redirect to /jokes
  return badRequest({
    fieldErrors: null,
    fields,
    formError: `Form not submitted correctly.`,
  });
};

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="login-container">
      <div className="login-container-left">
        <h1 className="logo">⍛MoviePilgrim</h1>
        <div className="login-form-container">
          <h1>Login</h1>
          <Form method="post">
            <div className="form-field">
              <label htmlFor="username-input">Username</label>
              <input
                type="text"
                id="username-input"
                name="username"
                placeholder="Enter your username"
                defaultValue={actionData?.fields?.username}
                aria-invalid={Boolean(actionData?.fieldErrors?.username)}
                aria-errormessage={
                  actionData?.fieldErrors?.username
                    ? 'username-error'
                    : undefined
                }
              />
              {actionData?.fieldErrors?.username ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="username-error">
                  {actionData.fieldErrors.username}
                </p>
              ) : null}
            </div>
            <div className="form-field">
              <label htmlFor="password-input">Password</label>
              <input
                type="text"
                id="password-input"
                name="password"
                placeholder="Enter your password"
                defaultValue={actionData?.fields?.password}
                aria-invalid={Boolean(actionData?.fieldErrors?.password)}
                aria-errormessage={
                  actionData?.fieldErrors?.password
                    ? 'password-error'
                    : undefined
                }
              />
              {actionData?.fieldErrors?.password ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="password-error">
                  {actionData.fieldErrors.password}
                </p>
              ) : null}
            </div>
            <div id="form-error-message">
              {actionData?.formError ? (
                <p className="form-validation-error" role="alert">
                  {actionData.formError}
                </p>
              ) : null}
            </div>
            <button type="submit" className="button">
              Sign in
            </button>
          </Form>
        </div>
      </div>
      <div className="login-container-right">
        <img src={cinemaImg} alt="A Movie Theater with Ceiling Lights" />
      </div>
    </div>
  );
}
