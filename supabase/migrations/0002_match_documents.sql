create or replace function public.match_documents(
  query_embedding extensions.vector(1536),
  match_count integer default 4
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity double precision
)
language sql
stable
security invoker
set search_path = public, extensions
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from public.documents
  order by documents.embedding <=> query_embedding
  limit least(greatest(match_count, 1), 8);
$$;
