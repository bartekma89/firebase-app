import { SignUpLink, SignInForm, PasswordForgetLink } from "./components";

export function SignInPage() {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
}
