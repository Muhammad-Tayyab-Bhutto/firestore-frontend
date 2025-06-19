// This page will automatically redirect to the admin dashboard.
import { redirect } from 'next/navigation';

export default function AdminRootPage() {
  redirect('/admin/dashboard');
  // Note: redirect() must be called outside of the JSX return.
  // It throws an error, so no component is actually rendered from here.
}
