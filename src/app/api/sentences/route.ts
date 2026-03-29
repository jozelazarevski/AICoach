import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/sentences
 *
 * Query params:
 *   category     — filter by category (managing-up, managing-down, career-growth)
 *   subcategory  — filter by subcategory (e.g. sbi-feedback, delegation)
 *   type         — filter by type (e.g. script, example, question)
 *   random       — if "true", return random sentences (default: false)
 *   limit        — number of results (default: 20, max: 100)
 *   offset       — pagination offset (default: 0, ignored when random=true)
 *   search       — full-text search in sentence text
 */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const category = params.get("category");
  const subcategory = params.get("subcategory");
  const type = params.get("type");
  const random = params.get("random") === "true";
  const search = params.get("search");
  const limit = Math.min(parseInt(params.get("limit") || "20", 10) || 20, 100);
  const offset = parseInt(params.get("offset") || "0", 10) || 0;

  const db = getDb();

  const conditions: string[] = [];
  const values: Record<string, string | number> = {};

  if (category) {
    conditions.push("category = @category");
    values.category = category;
  }
  if (subcategory) {
    conditions.push("subcategory = @subcategory");
    values.subcategory = subcategory;
  }
  if (type) {
    conditions.push("type = @type");
    values.type = type;
  }
  if (search) {
    conditions.push("text LIKE @search");
    values.search = `%${search}%`;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const order = random ? "ORDER BY RANDOM()" : "ORDER BY id";

  values.limit = limit;
  values.offset = offset;

  const rows = db
    .prepare(
      `SELECT id, category, subcategory, type, text, context FROM sentences ${where} ${order} LIMIT @limit OFFSET @offset`
    )
    .all(values);

  const countRow = db
    .prepare(`SELECT COUNT(*) as total FROM sentences ${where}`)
    .get(values) as { total: number };

  // Get available filters for discovery
  const categories = db
    .prepare("SELECT DISTINCT category FROM sentences ORDER BY category")
    .all() as { category: string }[];
  const subcategories = db
    .prepare(
      `SELECT DISTINCT subcategory FROM sentences ${category ? "WHERE category = @category" : ""} ORDER BY subcategory`
    )
    .all(category ? { category } : {}) as { subcategory: string }[];

  return Response.json({
    data: rows,
    pagination: {
      total: countRow.total,
      limit,
      offset,
      hasMore: offset + limit < countRow.total,
    },
    filters: {
      categories: categories.map((r) => r.category),
      subcategories: subcategories.map((r) => r.subcategory),
    },
  });
}
