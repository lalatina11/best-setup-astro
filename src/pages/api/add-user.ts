import type { User } from "@prisma/client";
import { prisma } from "../../libs/prisma";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const { email, password, name } = Object.fromEntries(
      formData.entries()
    ) as User;

    if (!email && !password && !name) {
      return new Response(JSON.stringify({ error: "email, password and name is required" }), {
        status: 400,
      });
    }

    await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    return redirect("/");
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ error: "Failed to delete user" }), {
      status: 500,
    });
  }
};
