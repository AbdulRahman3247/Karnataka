# Incredible Karnataka Backend (FastAPI + Supabase)

## Setup
1. Create a virtual environment and install deps:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Create `.env` from `.env.example` and fill in Supabase keys.

3. Apply the SQL schema in Supabase:
   - Open Supabase SQL Editor
   - Run the contents of `supabase_schema.sql`

4. Run the API:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Admin vs User
- All users sign up via `POST /auth/signup`.
- To promote a user to admin, update the `users.role` field in Supabase:

```sql
update public.users set role = 'admin' where email = 'admin@example.com';
```

## Storage (Place Photos)
- Create a public bucket named `place-images` in Supabase Storage.
- Uploads are handled by `POST /uploads/place-image` (admin only).
- The response contains a `public_url` you can store in `places.image_urls`.

## Auth usage for mobile/web
- After login, store the `access_token`.
- Send it on all protected requests:

```
Authorization: Bearer <access_token>
```

## Key Endpoints
- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me`
- `GET /districts`
- `GET /districts/{id}`
- `GET /places?district_id=&category=`
- `POST /places` (admin)
- `PUT /places/{id}` (admin)
- `DELETE /places/{id}` (admin)
- `POST /reviews`
- `GET /reviews/{place_id}`
- `POST /favorites`
- `GET /favorites`
- `DELETE /favorites/{id}`
- `POST /generate-itinerary`
- `GET /itineraries`
