import {
  SignUpLink,
  SignInForm,
  PasswordForgetLink,
  SignInGoogle,
} from "./components";

export function SignInPage() {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <SignInGoogle />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
}
