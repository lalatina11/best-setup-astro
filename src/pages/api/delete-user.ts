import { prisma } from "../../libs/prisma";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const id = formData.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    await prisma.user.delete({ where: { id: String(id) } });
    return (
      new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      }),
      redirect("/")
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ error: "Failed to delete user" }), {
      status: 500,
    });
  }
};
