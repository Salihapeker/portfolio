import { useState } from 'react';
import { Loader2, Lock, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("New passwords don't match");
    }
    if (passwords.newPassword.length < 8) {
      return toast.error('New password must be at least 8 characters');
    }

    setSaving(true);
    try {
      await authApi.changePassword(passwords.currentPassword, passwords.newPassword);
      toast.success('Password changed successfully');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your admin account</p>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-primary-400" />
            </div>
            <h2 className="font-display font-semibold">Account Info</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-dark-700">
              <span className="text-gray-500">Email</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-dark-700">
              <span className="text-gray-500">Name</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-500">Role</span>
              <span className="tag">{user?.role}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center">
              <Lock className="w-4 h-4 text-primary-400" />
            </div>
            <h2 className="font-display font-semibold">Change Password</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label">Current Password</label>
              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                required
                className="input"
              />
            </div>
            <div>
              <label className="label">New Password (min 8 chars)</label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                required
                minLength={8}
                className="input"
              />
            </div>
            <div>
              <label className="label">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                required
                className="input"
              />
            </div>
            <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
