import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  const { data, error } = await supabase.from('developers').select('*');
  if (error) {
    return Response.json({ data: null, success: false, message: error.message }, { status: 500 });
  }
  return Response.json({
    data: { items: data, total: data.length, nextPage: null },
    success: true,
    message: null,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from('developers').insert([body]).select().single();
  if (error) {
    return Response.json({ data: null, success: false, message: error.message }, { status: 400 });
  }
  return Response.json({
    data,
    success: true,
    message: null,
  }, { status: 201 });
}
