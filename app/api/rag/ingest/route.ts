import { NextResponse } from "next/server";
import { getAllKnowledge } from "@/lib/knowledge";
import { ingestDocument, clearDocuments } from "@/lib/rag";
import { supabase } from "@/lib/supabase";

export async function POST() {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    await clearDocuments();

    const entries = getAllKnowledge();
    let totalChunks = 0;

    for (let i = 0; i < entries.length; i++) {
      if (i > 0) await new Promise(r => setTimeout(r, 2000));
      const result = await ingestDocument(entries[i].content, entries[i].source);
      if (result.ok) {
        totalChunks += result.chunks;
      }
    }

    const { data: projects } = await supabase
      .from("projects")
      .select("name, category, description, tags, result, project_url")
      .eq("is_active", true);

    if (projects) {
      for (let i = 0; i < projects.length; i++) {
        if (i > 0 || entries.length > 0) await new Promise(r => setTimeout(r, 2000));
        const p = projects[i];
        const text = [
          `Project: ${p.name}`,
          `Category: ${p.category}`,
          `Description: ${p.description || ""}`,
          `Tags: ${(p.tags || []).join(", ")}`,
          `Result: ${p.result || ""}`,
          `URL: ${p.project_url || ""}`,
        ]
          .filter(Boolean)
          .join("\n");

        const result = await ingestDocument(text, `project:${p.name}`);
        if (result.ok) {
        totalChunks += result.chunks ?? 0;
        }
      }
    }

    return NextResponse.json({
      ok: true,
      totalChunks,
      message: `Indexed ${totalChunks} chunks from ${entries.length} sources and ${projects?.length || 0} projects`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
