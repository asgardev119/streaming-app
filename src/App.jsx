import { useEffect, useState } from "react";
import StreamRoom from "./components/StreamRoom.jsx";
import Auth from "./components/Auth.jsx";
import Subscribe from "./components/Subscribe.jsx";
import { login, setLive, getLive } from "./lib/sheet.js";
import { isLiveNow, SCHEDULE_TEXT } from "./lib/schedule.js";
import GuestPage from './components/GuestPage.jsx';
const ROOM_ID = "stream-main";
const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || "").toLowerCase();

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [watching, setWatching] = useState(false);
  const [streamLive, setStreamLive] = useState(false);
  const [, setTick] = useState(0);
  const [guest, setGuest] = useState(false);

  // Schedule display har 30 second mein refresh karein
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  // Saved login se user dobara check karein (admin ne verify kiya ho sakta hai)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("streamhub_user") || "null");
    if (!saved) {
      setChecking(false);
      return;
    }
    login(saved)
      .then((r) => {
        if (r.ok)
          setUser({ ...r.user, email: saved.email, passHash: saved.passHash });
        else localStorage.removeItem("streamhub_user");
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  // Live status: admin heartbeat bhejta hai, user status check karta hai
  useEffect(() => {
    if (!user) return;

    if (user.email === ADMIN_EMAIL) {
      if (!watching) return;
      const beat = () =>
        setLive({ email: user.email, passHash: user.passHash }).catch(() => {});
      beat();
      const id = setInterval(beat, 30000);
      return () => clearInterval(id);
    }

    const check = () =>
      getLive()
        .then((r) => setStreamLive(!!r.live))
        .catch(() => {});
    check();
    const id = setInterval(check, 15000);
    return () => clearInterval(id);
  }, [user, watching]);

  const logout = () => {
    localStorage.removeItem("streamhub_user");
    setUser(null);
    setWatching(false);
    setStreamLive(false);
  };

  if (checking) {
    return (
      <div className="grid min-h-dvh place-items-center text-zinc-400">
        Loading...
      </div>
    );
  }

  // if (!user) return <Auth onAuth={setUser} />;
  if (!user) {
  if (guest) return <GuestPage onBack={() => setGuest(false)} />;
  return <Auth onAuth={setUser} onGuest={() => setGuest(true)} />;
}

  const isAdmin = user.email === ADMIN_EMAIL;
  const isActive =
    user.status === "Verified" &&
    user.paidUntil &&
    new Date(user.paidUntil) > new Date();

  if (!isAdmin && !isActive) {
    return <Subscribe user={user} onLogout={logout} />;
  }

  const scheduleOpen = isLiveNow();
  const showLive = isAdmin ? watching : streamLive;

  if (watching) {
    return (
      <div className="min-h-dvh px-3 py-4 sm:px-6 sm:py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setWatching(false)}
              className="btn-ghost !px-4 !py-2 text-sm"
            >
              ← Wapas Jaayein
            </button>
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <span className="live-dot h-2 w-2 rounded-full bg-rose-500" />
              {isAdmin ? "Host" : "Viewer"} · {user.name}
            </div>
          </div>
          <StreamRoom roomId={ROOM_ID} userName={user.name} isHost={isAdmin} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center gap-6 px-4 py-10 text-center">
      <div className="flex w-full items-center justify-between">
        <span className="text-lg font-extrabold">
          Stream<span className="text-brand-400">Hub</span>
        </span>
        <button
          onClick={logout}
          className="text-sm text-zinc-500 hover:text-white"
        >
          Logout
        </button>
      </div>

      <div className="glass w-full rounded-3xl p-8 sm:p-12">
        <p className="text-sm text-zinc-400">Welcome back</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
          {user.name}
        </h1>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm">
          <span
            className={`live-dot h-2 w-2 rounded-full ${showLive ? "bg-rose-500" : "bg-zinc-500"}`}
          />
          {showLive ? "Stream live hai" : "Abhi stream band hai"}
        </div>

        <p className="mt-4 text-sm text-zinc-400">Schedule: {SCHEDULE_TEXT}</p>

        <div className="mt-8">
          {isAdmin ? (
            <button
              onClick={() => setWatching(true)}
              className="btn-primary w-full sm:w-auto"
            >
              🎥 Go Live
            </button>
          ) : (
            <button
              onClick={() => setWatching(true)}
              disabled={!streamLive}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              {streamLive ? '▶ Room Join Karein' : 'Stream abhi live nahi hai'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
