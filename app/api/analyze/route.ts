import { NextResponse } from "next/server";
import { z } from "zod";
import { runBobAcceleratorWorkflow } from "@/app/lib/agents";

const schema = z.object({
  query: z.string().min(5).max(500)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = schema.parse(body);
    const result = await runBobAcceleratorWorkflow(query);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 400 }
    );
  }
}
