import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Award, Inbox, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import { projectsApi, certificatesApi, contactApi } from '../../api/client';

export default function DashboardPage() {
  const [stats, setStats] = useState({ projects: 0, certificates: 0, messages: 0, unread: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projects, certs, msgs] = await Promise.all([
        projectsApi.getAll(),
        certificatesApi.getAll(),
        contactApi.getAll(),
      ]);
      const messages = msgs.data.data || [];
      setStats({
        projects: projects.data.data?.length || 0,
        certificates: certs.data.data?.length || 0,
        messages: messages.length,
        unread: messages.filter((m) => !m.read).length,
      });
      setRecentMessages(messages.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { label: 'Projects', value: stats.projects, icon: FolderKanban, href: '/admin/projects', color: 'text-blue-400' },
    { label: 'Certificates', value: stats.certificates, icon: Award, href: '/admin/certificates', color: 'text-purple-400' },
    { label: 'Messages', value: stats.messages, icon: Inbox, href: '/admin/messages', color: 'text-green-400' },
    { label: 'Unread', value: stats.unread, icon: TrendingUp, href: '/admin/messages', color: 'text-orange-400' },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back — here's a quick overview.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Link key={i} to={card.href} className="card p-6 group hover:-translate-y-0.5 transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center ${card.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="text-3xl font-display font-bold mb-1">{card.value}</div>
                  <div className="text-sm text-gray-400">{card.label}</div>
                </Link>
              );
            })}
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-xl">Recent Messages</h2>
              <Link to="/admin/messages" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <p className="text-gray-500 text-sm py-8 text-center">No messages yet.</p>
            ) : (
              <div className="space-y-2">
                {recentMessages.map((msg) => (
                  <Link
                    key={msg._id}
                    to="/admin/messages"
                    className="block p-4 rounded-xl hover:bg-dark-700 transition-colors border border-transparent hover:border-dark-500"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm truncate">{msg.name}</span>
                          {!msg.read && <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />}
                        </div>
                        <div className="text-xs text-gray-500 truncate">{msg.email}</div>
                      </div>
                      <span className="text-xs text-gray-500 font-mono flex-shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300 truncate">{msg.subject}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
