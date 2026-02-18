https://123mandar.github.io/tcet-market/

## Google Login configuration (Render / production)

Set at least one of these environment variables on your backend service:

- `GOOGLE_CLIENT_ID` (single OAuth web client id), or
- `GOOGLE_CLIENT_IDS` (comma-separated list of allowed OAuth web client ids)

`REACT_APP_CLIENT_ID` is still used as a fallback for local setups, but production should use server-side variables above.
