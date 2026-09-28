create index if not exists documents_content_fts_idx
  on public.documents
  using gin (to_tsvector('english', content));

create or replace function public.match_documents_hybrid(
  query_embedding extensions.vector(1536),
  query_text text,
  match_count integer default 6
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity double precision,
  keyword_score double precision,
  hybrid_score double precision
)
language sql
stable
security invoker
set search_path = public, extensions
as $$
  with query as (
    select websearch_to_tsquery('english', query_text) as terms
  )
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity,
    ts_rank_cd(to_tsvector('english', documents.content), query.terms)::double precision as keyword_score,
    (
      0.76 * (1 - (documents.embedding <=> query_embedding))
      + 0.24 * least(ts_rank_cd(to_tsvector('english', documents.content), query.terms)::double precision, 1)
    ) as hybrid_score
  from public.documents
  cross join query
  where (1 - (documents.embedding <=> query_embedding)) >= 0.18
     or to_tsvector('english', documents.content) @@ query.terms
  order by hybrid_score desc
  limit least(greatest(match_count, 1), 8);
$$;
