-- New private app resource bucket. Existing documents, accounts and policies are unchanged.
insert into storage.buckets(id,name,public,file_size_limit)
values('g11-hub-assets','g11-hub-assets',false,52428800);
create policy g11_hub_assets_read on storage.objects for select to authenticated
using (bucket_id='g11-hub-assets' and (select g11_private.role()) is not null);
-- No client INSERT, UPDATE or DELETE policy. Deploys use a short-lived bounded server uploader.
