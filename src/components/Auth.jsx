import { useState } from "react";
import { login, signup, sha256 } from "../lib/sheet.js";

// export default function Auth({ onAuth }) {
export default function Auth({ onAuth, onGuest }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const email = form.email.trim().toLowerCase();
      const passHash = await sha256(form.password);

      if (tab === "signup") {
        const r = await signup({
          name: form.name,
          phone: form.phone,
          email,
          passHash,
        });
        setMsg(r.ok ? r.message : r.error);
        if (r.ok) setTab("login");
      } else {
        const r = await login({ email, passHash });
        if (!r.ok) return setMsg(r.error);
        localStorage.setItem(
          "streamhub_user",
          JSON.stringify({ email, passHash }),
        );
        onAuth({ ...r.user, email, passHash });
      }
    } catch {
      setMsg("Network error. VITE_APPS_SCRIPT_URL check karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-dvh place-items-center px-4 py-10">
      <div className="glass w-full max-w-md rounded-3xl p-6 sm:p-10">
        <h1 className="text-center text-2xl font-extrabold">
          Stream<span className="text-brand-400">Hub</span>
        </h1>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-1">
          {["login", "signup"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(t);
                setMsg("");
              }}
              className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                tab === t
                  ? "bg-gradient-to-r from-brand-600 to-fuchsia-600 text-white"
                  : "text-zinc-400"
              }`}
            >
              {t === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {tab === "signup" && (
            <>
              <input
                className="input"
                placeholder="Naam"
                required
                value={form.name}
                onChange={set("name")}
              />
              <input
                className="input"
                placeholder="Mobile number"
                required
                value={form.phone}
                onChange={set("phone")}
              />
            </>
          )}
          <input
            className="input"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={set("email")}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            required
            minLength={6}
            value={form.password}
            onChange={set("password")}
          />

          {msg && <p className="text-center text-sm text-amber-300">{msg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
          >
            {loading ? "Ruko..." : tab === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <button
          type="button"
          onClick={onGuest}
          className="btn-ghost mt-4 w-full"
        >
          👀 Views as a Guest
        </button>
      </div>
    </div>
  );
}
