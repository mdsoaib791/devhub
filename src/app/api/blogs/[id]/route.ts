import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase.from('blogs').select('*').eq('id', params.id).single();
  if (error) {
    return Response.json({ data: null, success: false, message: error.message }, { status: 404 });
  }
  return Response.json({ data, success: true, message: null });
}

 
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  // TODO: Add authentication check here
  const body = await req.json();
  const { data, error } = await supabase.from('blogs').update(body).eq('id', params.id).select().single();
  if (error) {
    return Response.json({ data: null, success: false, message: error.message }, { status: 400 });
  }
  return Response.json({ data, success: true, message: null });
}


