from supabase import create_client, Client
from .config import settings


def get_supabase_client(anon: bool = True) -> Client:
    if anon:
        return create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)

    if not settings.SUPABASE_SERVICE_ROLE_KEY:
        raise RuntimeError("SUPABASE_SERVICE_ROLE_KEY is required for server-side operations")

    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)


supabase_anon = get_supabase_client(anon=True)
supabase_admin = get_supabase_client(anon=False)
