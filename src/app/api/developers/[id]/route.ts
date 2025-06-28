// src/app/api/developers/route.ts

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Get developer
  const { data: developer, error: devError } = await supabase
    .from('developers')
    .select('*')
    .eq('id', params.id)
    .single();

  if (devError || !developer) {
    return Response.json({ data: null, success: false, message: devError?.message || 'Not found' }, { status: 404 });
  }

  // Get blogs for developer
  const { data: blogs, error: blogError } = await supabase
    .from('blogs')
    .select('id, title, excerpt, created_at')
    .eq('developer_id', params.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  return Response.json({
    data: {
      ...developer,
      blogs: blogs || [],
    },
    success: true,
    message: null,
  });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { data, error } = await supabase.from('developers').update(body).eq('id', params.id).select().single();
  if (error) {
    return Response.json({ data: null, success: false, message: error.message }, { status: 400 });
  }
  return Response.json({
    data,
    success: true,
    message: null,
  });
}


