import { useState, useEffect } from 'react';
import { Trash2, Mail, MailOpen, Loader2, Reply, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactApi } from '../../api/client';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const { data } = await contactApi.getAll();
      setMessages(data.data || []);
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      try {
        await contactApi.markRead(msg._id);
        setMessages((prev) => prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m)));
      } catch {}
    }
  };

  const handleDelete = async (id, e) => {
    e?.stopPropagation();
    if (!confirm('Delete this message permanently?')) return;
    try {
      await contactApi.delete(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Messages</h1>
        <p className="text-gray-400">
          {messages.length} total · {messages.filter((m) => !m.read).length} unread
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="card p-20 text-center text-gray-500">
          <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto pr-2">
            {messages.map((msg) => (
              <button
                key={msg._id}
                onClick={() => handleRead(msg)}
                className={`w-full text-left card p-4 transition-all ${
                  selected?._id === msg._id ? 'border-primary-500' : ''
                } ${!msg.read ? 'bg-primary-500/5' : ''}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {msg.read ? (
                      <MailOpen className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    ) : (
                      <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                    )}
                    <span className={`font-semibold text-sm truncate ${!msg.read ? 'text-white' : 'text-gray-400'}`}>
                      {msg.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono flex-shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 truncate mb-1">{msg.email}</div>
                <div className="text-sm truncate">{msg.subject}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            {selected ? (
              <div className="card p-6 sticky top-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="min-w-0">
                    <h2 className="text-xl font-display font-semibold mb-1 truncate">{selected.subject}</h2>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400">
                      <span className="font-semibold text-gray-300">{selected.name}</span>
                      <span>·</span>
                      <a href={`mailto:${selected.email}`} className="text-primary-400 hover:underline">{selected.email}</a>
                    </div>
                    <div className="text-xs text-gray-500 font-mono mt-1">
                      {new Date(selected.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                      className="btn-secondary text-xs py-2 px-3"
                    >
                      <Reply className="w-3 h-3" /> Reply
                    </a>
                    <button onClick={(e) => handleDelete(selected._id, e)} className="btn-danger">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-dark-600">
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                </div>
              </div>
            ) : (
              <div className="card p-16 text-center text-gray-500 h-full flex items-center justify-center">
                <div>
                  <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Select a message to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
