import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/contact.model";

export async function POST(request) {
  await dbConnect();

  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.category) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Normalize input
    data.email = data.email.trim().toLowerCase();
    data.phone = data.phone.trim();

    // Create contact document
    const contact = await Contact.create(data);

    return new Response(JSON.stringify(contact), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle MongoDB duplicate key error for unique fields
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      return new Response(
        JSON.stringify({
          error: `Duplicate value for ${duplicatedField}. Please use another.`,
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }
    // General error fallback
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();

    return new Response(JSON.stringify({ success: true, data: contacts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
