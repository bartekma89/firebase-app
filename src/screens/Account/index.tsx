import { PasswordForgetForm } from "../PasswordForget/components";
import { PasswordChangeForm } from "../../components/PasswordChangeForm/";

export function AccountPage() {
  return (
    <div>
      <h1>Account</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
}
