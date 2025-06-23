# BUG-001: Google OAuth Authentication Error

## Created
📅 2024-01-15

## Last Updated
📅 2024-01-15

## Status
- [x] Open
- [ ] In Progress
- [ ] Resolved

## Priority
🔴 High

## Description
Users are unable to sign in with Google. The OAuth flow fails with a 400 error after redirecting from Google.

## Steps to Reproduce
1. Go to the sign-in page
2. Click "Sign in with Google"
3. Complete Google authentication
4. Observe error on redirect

## Expected Behavior
User should be signed in and redirected to their dashboard.

## Actual Behavior
User sees a 400 error and is not signed in.

## Environment
- Next.js 15.3.4
- Firebase Auth
- Google OAuth

## Logs / Screenshots
```
Error 400: redirect_uri_mismatch
```

## Suggested Fix
- Check Google OAuth redirect URI configuration
- Ensure environment variables are set correctly
- Review NextAuth and Firebase Auth integration

---

**Version**: v1  
**Created**: 2024-01-15  
**Last Updated**: 2024-01-15  
**Status**: Open
