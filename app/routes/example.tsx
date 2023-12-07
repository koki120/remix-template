import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { requireUserId } from "~/adapter/session/session.server";

export const loader = async (args: LoaderFunctionArgs) => {
  // auth
  await requireUserId(args.request);
  return null;
};

export default function ExamplePage() {
  return (
    <>
      <h1>🚀 you are verified 🚀</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
