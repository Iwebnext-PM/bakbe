# ProDriver Firestore Security Specification

## 1. Data Invariants
1. **No Public PII Exposure**: `driverApplications` and `contactInquiries` contain PII (`fullName`, `phone`, `email`, `city`, `state`, `zipCode`). Neither collection may ever be read, listed, updated, or deleted by unauthenticated users or non-admin users.
2. **Strict Schema Enforcement & No Shadow Fields**: Every created document must match exact allowed keys (`hasAll` + `hasOnly`), exact field types, strict `.size()` bounds, and valid enums.
3. **Server Timestamp Integrity**: `createdAt` and `updatedAt` must equal `request.time` on creation, and `createdAt` is immutable on update.
4. **Initial Status Lock**: Public submissions must enter with `status == 'submitted'` (applications) or `status == 'new'` (inquiries). Applicants cannot forge pre-approved or contacted states.
5. **Verified Admin Gate**: Admin read/update/delete access requires `request.auth != null && request.auth.token.email_verified == true` and membership in `/admins/{uid}` or bootstrapped verified admin email.

## 2. Adversarial "Dirty Dozen" Payloads (All Must Return PERMISSION_DENIED)
1. **Public PII Scrape (`list /driverApplications`)**: Unauthenticated or standard signed-in user queries `/driverApplications`.
2. **Public Single-Doc Read (`get /driverApplications/{id}`)**: Non-admin reads another driver's application.
3. **Shadow Field Injection**: Create `/driverApplications/{id}` with extra field `isVerified: true` or `adminNotes: "approved"`.
4. **Status Spoofing on Create**: Create `/driverApplications/{id}` with `status: "contacted"` instead of `"submitted"`.
5. **Client Timestamp Forgery**: Create `/driverApplications/{id}` with a backdated `createdAt` not equal to `request.time`.
6. **ID Poisoning**: Create `/driverApplications/{1500_char_invalid_id}` failing `isValidId()`.
7. **Denial-of-Wallet String Overflow**: Create `/driverApplications/{id}` with 50KB `additionalComments`.
8. **Unbounded Array Attack**: Create `/driverApplications/{id}` with 25 elements in `endorsements`.
9. **Missing Privacy Consent**: Create `/driverApplications/{id}` with `privacyConsent: false`.
10. **Email Spoofing Attack**: Signed-in user with `email_verified: false` claiming admin email tries to `list /driverApplications`.
11. **Self-Assigned Admin Escalation**: Non-admin user tries to write `/admins/{theirUid}` with `{ role: "admin" }`.
12. **Public Contact Inquiry Read/Delete**: Non-admin attempts `get`, `list`, `update`, or `delete` on `/contactInquiries/{id}`.
