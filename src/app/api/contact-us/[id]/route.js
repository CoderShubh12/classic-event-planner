import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/contact.model";

export async function PUT(request, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const body = await request.json();
    const updated = await Contact.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );
    if (!updated) {
      return new Response(JSON.stringify({ error: "Inquiry not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
