import SignInForm from "./form";

export default function SignInPage() {
  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <SignInForm csrfToken={""} />
    </div>
  );
}
