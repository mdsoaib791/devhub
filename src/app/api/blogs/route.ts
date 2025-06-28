// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// export async function GET(req: Request) {
//   // Public blogs only
//   const { data, error } = await supabase
//     .from('blogs')
//     .select('id, developer_id, title, excerpt, created_at')
//     .eq('is_public', true)
//     .order('created_at', { ascending: false });

//   if (error) {
//     return Response.json({ data: null, success: false, message: error.message }, { status: 500 });
//   }
//   return Response.json({
//     data: { items: data, total: data.length },
//     success: true,
//     message: null,
//   });
// }

// // Only allow POST for authenticated users (pseudo-code, add your auth logic)
// export async function POST(req: Request) {
//   // TODO: Add authentication check here
//   const body = await req.json();
//   const { data, error } = await supabase.from('blogs').insert([body]).select().single();
//   if (error) {
//     return Response.json({ data: null, success: false, message: error.message }, { status: 400 });
//   }
//   return Response.json({
//     data,
//     success: true,
//     message: null,
//   }, { status: 201 });
// }
