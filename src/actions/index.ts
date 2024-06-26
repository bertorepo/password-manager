// AUTH
export { forgotPassword } from '@/actions/auth/forgot-password-action';
export { resetPassword } from '@/actions/auth/reset-password-action';
export { authorizeUser } from '@/actions/auth/authorize-user-action';
export { signOutUser } from '@/actions/auth/sign-out-action';
export { verifyUserEmail } from '@/actions/auth/verify-user-email-action';
export { registerUser } from '@/actions/auth/register-user-action';

// WEB CREDENTIALS
export { fetchCredentialById } from '@/actions/web-credential/fetch-web-credential-by-id-action';
export { addCredential } from '@/actions/web-credential/add-web-credential-action';
export { updateCredentialById } from '@/actions/web-credential/update-web-credential-action';
export { deleteCredential } from '@/actions/web-credential/delete-credential-action';
export { markAsImportant } from '@/actions/web-credential/mark-important-action';

// SETTINGS
export { updateProfileImage } from '@/actions/settings/update-profile-image-action';
export { updateProfile } from '@/actions/settings/update-profile-details-action';
export { changePassword } from '@/actions/settings/update-password-action';

// EMAILS

export { fetchEmailCredentialById } from '@/actions/emails/fetch-email-credential-by-id-action';
export { markEmailAsImportant } from '@/actions/emails/mark-important-action';
export { deleteEmailCredential } from '@/actions/emails/delete-credential-action';
export { updateEmailCredentialById } from '@/actions/emails/update-email-credential-action';
export { addEmailCredential } from '@/actions/emails/add-email-credential-action';

// NOTE
export { addNote } from '@/actions/note/add-note-action';
export { fetchNote } from '@/actions/note/fetch-note-by-id-action';
export { deleteNote } from '@/actions/note/delete-note-action';
export { markNoteAsImportant } from '@/actions/note/note-mark-important-action';
export { updateNote } from '@/actions/note/update-note-action';

// Search
export { searchGlobally } from '@/actions/search/global-search-action';

// USER
export { getUserWebCredentialData } from '@/actions/users/user-web-credential-action';
export { getUserEmailCredentialData } from '@/actions/users/user-email-credential-action';
export { getUserNoteCredentialData } from '@/actions/users/user-note-credential-action';

// dashboard
export { usersWithCount } from '@/actions/dashboard/metric-count-action';
export { recentItems } from '@/actions/dashboard/recent-items-actions';

// trash
export { fetchAllDeletedItems } from '@/actions/trash/fetch-all-deleted-items-action';
export { restoreCredential } from '@/actions/trash/restore-credential-action';
export { deleteTrashCredential } from '@/actions/trash/delete-credential-action';
