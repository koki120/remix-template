import { type ActionFunctionArgs } from "@remix-run/node";
import { Link, useSearchParams } from "@remix-run/react";
import { login } from "~/adapter/session/login.server";
import { createUserSession } from "~/adapter/session/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form: FormData = await request.formData();
  const password = form.get("password") as string;
  const email = form.get("email") as string;
  const redirectTo = form.get("redirectTo") as string;

  const id = await login(email, password);
  if (!id) {
    return null;
  }
  return createUserSession(id, redirectTo);
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  return (
    <>
      <h1>Login</h1>
      <form method="post">
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get("redirectTo") ?? undefined}
        />
        <div>
          <label htmlFor="email-input">Email</label>
          <input type="email" id="email-input" name="email" />
        </div>
        <div>
          <label htmlFor="password-input">Password</label>
          <input id="password-input" name="password" type="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <nav>
        <ul>
          <li>
            <Link
              to={
                searchParams.get("redirectTo")
                  ? `/register?redirectTo=${searchParams.get("redirectTo")}`
                  : "/register"
              }
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
