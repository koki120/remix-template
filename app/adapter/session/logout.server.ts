import { redirect } from "@remix-run/node";
import { getUserSession, storage } from "~/adapter/session/session.server";

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
