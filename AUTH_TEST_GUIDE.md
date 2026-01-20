# Client Portal Authentication - Quick Test Guide

## ✅ What's Ready to Test

### 1. Login Flow
**URL**: `http://localhost:3000/login`

**Test Case 1: Valid Credentials**
- Email: `ahmed@techstartup.sa`
- Password: `demo123`
- Expected: Redirects to `/client/client-001`

**Test Case 2: Invalid Email**
- Email: `invalid@email.com`
- Password: `demo123`
- Expected: Error message "Invalid email or password"

**Test Case 3: Wrong Password**
- Email: `ahmed@techstartup.sa`
- Password: `wrongpassword`
- Expected: Error message "Invalid email or password"

**Test Case 4: Empty Fields**
- Email: empty
- Password: empty
- Expected: Error message "CRITICAL: AUTHENTICATION CREDENTIALS REQUIRED"

---

### 2. Registration Flow
**URL**: `http://localhost:3000/register`

**Test Case 1: Complete Registration**
- Follow 3-step form (Identity → Enterprise → Deployment)
- Fill all fields
- Accept terms
- Click "INITIALIZE DEPLOYMENT"
- Expected: Success message → Redirect to login after 2 seconds

**Test Case 2: Duplicate Email**
- Email: `ahmed@techstartup.sa` (already registered)
- Expected: Error "Email is already registered"

**Test Case 3: Password Mismatch**
- Password: `Password123!`
- Confirm: `Password456!`
- Expected: Error "Passwords do not match"

**Test Case 4: Short Password**
- Password: `short`
- Expected: Error "Password must be at least 8 characters"

**Test Case 5: Terms Not Accepted**
- Fill all fields
- Don't check terms checkbox
- Click submit
- Expected: Error "You must accept the terms and conditions"

---

### 3. Protected Routes
**URL**: `http://localhost:3000/client/client-001` (without login)

**Test Case 1: Access Without Session**
- Don't login first
- Go directly to `/client/client-001`
- Expected: Redirect to `/login`

**Test Case 2: After Login**
- Login with `ahmed@techstartup.sa` / `demo123`
- Should see client portal dashboard
- Expected: Full access to all sub-pages

**Test Case 3: Wrong Client ID**
- Login with `ahmed@techstartup.sa` (maps to client-001)
- Try to access `/client/client-002`
- Expected: Redirect to `/login` (security check)

---

### 4. Session Management
**Test Case 1: Session Persistence**
- Login successfully
- Refresh the page
- Expected: Still logged in, dashboard visible

**Test Case 2: Logout**
- From client portal, click "TERMINATE SESSION" in sidebar
- Expected: Redirected to login, session cleared

**Test Case 3: Cross-Tab Sessions**
- Login in one tab
- Open another tab to `/client/client-001`
- Expected: Access granted (same session cookie)

---

## 📊 Available Demo Clients

| Name | Email | Password | Client ID |
|------|-------|----------|-----------|
| Ahmed Al-Rashid | ahmed@techstartup.sa | demo123 | client-001 |
| Fatima Al-Dosari | fatima@ecommercepro.sa | demo123 | client-002 |
| Omar Al-Fahad | omar@logisticsplus.sa | demo123 | client-003 |
| Sara Al-Mansouri | sara@financepro.sa | demo123 | client-004 |

---

## 🔍 How to Check Session Cookie

### Using Browser DevTools
1. Open DevTools (F12)
2. Go to Application → Cookies
3. Find cookie named `largify_session`
4. Value is base64-encoded JWT

### Using Terminal
```bash
# Check cookie after login
curl -v http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ahmed@techstartup.sa","password":"demo123"}'

# Look for: Set-Cookie: largify_session=...
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Login button not working | Check API endpoint `/api/auth/login` exists |
| Redirects not working | Verify `next/navigation` is imported |
| Session not persisting | Check cookies enabled in browser |
| Getting 401 on `/client/*` | Clear cookies and login again |
| Registration form won't submit | Check all required fields are filled |

---

## 📋 Implementation Files Created

✅ `/app/api/auth/login/route.ts` - Login API  
✅ `/app/api/auth/register/route.ts` - Registration API  
✅ `/app/api/auth/verify/route.ts` - Session verification  
✅ `/app/api/auth/logout/route.ts` - Logout handler  
✅ `/middleware.ts` - Route protection  
✅ `/app/login/page.tsx` - Updated login UI  
✅ `/app/register/page.tsx` - Updated registration UI  

---

## 🚀 Next Steps After Testing

1. **Database Integration**: Replace mock data with actual PostgreSQL
2. **Password Hashing**: Implement bcrypt for secure password storage
3. **Email Verification**: Add SMTP and verification email flow
4. **Error Logging**: Implement proper logging system
5. **Rate Limiting**: Protect against brute force attacks
6. **2FA**: Add two-factor authentication option

---

**Last Updated**: January 21, 2026  
**Status**: Ready for Testing ✅
