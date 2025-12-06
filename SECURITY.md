# 🔒 Security Configuration

## Firebase Security

- Place `.env.local` in `.gitignore`
- Never commit Firebase keys to Git
- Use environment variables only
- Enable Firebase Authentication domains
- Add production URL to authorized domains

## CORS Configuration

- Client URL must be whitelisted in server
- Update `CLIENT_URL` env variable for production
- Test CORS after deployment

## Stripe Security

- Use publishable key in client (safe for public)
- Keep secret key in server only
- Test with Stripe test keys
- Switch to live keys for production

## JWT Token Security

- Stored in httpOnly cookies (not localStorage)
- Auto-expires after 7 days
- Secure flag enabled in production
- CSRF protection enabled

## Input Validation

- All forms use react-hook-form validation
- Backend validates all inputs
- XSS protection enabled
- SQL injection prevention (MongoDB parameterized queries)

## Best Practices

✅ Environment variables for all secrets
✅ HTTPS enabled in production
✅ Secure cookies for auth tokens
✅ CORS properly configured
✅ Input validation on client and server
✅ Protected API routes with middleware
✅ Role-based access control
