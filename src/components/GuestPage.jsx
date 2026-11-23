import { useState } from "react";
import { SCHEDULE_TEXT } from "../lib/schedule.js";
const HERO_IMG =
  "https://cdn.prod.website-files.com/61897942a111e71d881c9cf0/68902bf9491de2fc1160615a_AD_4nXdQZvOZDbfIplpkidw8fWv2Ud-mZ6Js_Ju1LFYYXC6SHx7CDTudQbp-_ILUPZyV0IOKh_P6Wssq_vU_dcwk387YtlKygKRvaMrbFg4Fo2LYQaVU9wTSMUazT2No1QZ4-eYitOAH9A.webp";
const PRICE = 199;

const features = [
  {
    icon: "🔴",
    title: "Live Streaming",
    desc: "HD quality, low latency, live chat and reactions.",
  },
  {
    icon: "🖼️",
    title: "Photos & Frames",
    desc: "The best moments from our streams, captured in photos and frames.",
  },
  {
    icon: "🎬",
    title: "Videos",
    desc: "A collection of highlights and replays.",
  },
  {
    icon: "🎉",
    title: "Entertainment",
    desc: "Games, music, talk shows and fun challenges.",
  },
];
const gallery = [
  {
    title: "Late Night Gaming",
    type: "Photo",
    emoji: "🎮",
    grad: "from-violet-600 to-fuchsia-600",
    img: "https://picsum.photos/seed/late-night-gaming/800/600",
  },
  {
    title: "Live Music Session",
    type: "Video",
    emoji: "🎸",
    grad: "from-amber-500 to-rose-600",
    img: "https://picsum.photos/seed/live-music-session/800/600",
  },
  {
    title: "Coding Live",
    type: "Frame",
    emoji: "💻",
    grad: "from-cyan-500 to-blue-600",
    img: "https://i.ytimg.com/vi/xJO_kJHM6pA/sddefault.jpg",
  },
  {
    title: "Talk Show Moments",
    type: "Photo",
    emoji: "🎤",
    grad: "from-emerald-500 to-teal-600",
    img: "https://picsum.photos/seed/talk-show-moments/800/600",
  },
  {
    title: "Fun Challenges",
    type: "Video",
    emoji: "🎉",
    grad: "from-pink-500 to-orange-500",
    img: "https://picsum.photos/seed/fun-challenges/800/600",
  },
  {
    title: "Community Night",
    type: "Frame",
    emoji: "🌙",
    grad: "from-indigo-600 to-purple-700",
    img: "https://picsum.photos/seed/community-night/800/600",
  },
];

const steps = [
  {
    title: "Sign Up",
    desc: "Enter your name, mobile number, email and password. Your details are securely saved in our Sheet.",
  },
  {
    title: "Admin Verification",
    desc: "The admin will review your account, usually within a short time.",
  },
  {
    title: "Subscribe",
    desc: `₹${PRICE} / month. Scan the UPI QR code and make the payment.`,
  },
  {
    title: "Submit UTR",
    desc: "Enter your payment UTR / Transaction ID in the app.",
  },
  {
    title: "Join the Live Stream",
    desc: "Once verified, the Join Room button becomes active when the stream is live.",
  },
];

// Sample reviews (demo content)
const reviews = [
  {
    name: "Aarav S.",
    text: "The video quality is excellent and the chat runs smoothly.",
    stars: 5,
  },
  {
    name: "Priya M.",
    text: "The weekend timing is perfect. There's always something new every week.",
    stars: 5,
  },
  {
    name: "Rohan K.",
    text: "The layout looks clean on mobile too, and the subscription process was simple.",
    stars: 4,
  },
];

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Feedback() {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!rating || !text.trim()) return;
    setSent(true);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.name} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{r.name}</span>
              <span className="text-amber-400">
                {"★".repeat(r.stars)}
                {"☆".repeat(5 - r.stars)}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {r.text}
            </p>
          </div>
        ))}
        <p className="text-center text-xs text-zinc-500">
          * Ye sample reviews hain
        </p>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold">Aapka feedback</h3>
        {sent ? (
          <p className="mt-6 rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-300">
            Shukriya! Aapka feedback mil gaya.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-4">
            <div className="flex gap-2 text-2xl">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className={
                    s <= rating
                      ? "text-amber-400"
                      : "text-zinc-600 hover:text-zinc-400"
                  }
                  aria-label={`${s} star`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              className="input min-h-28 resize-none"
              placeholder="Stream ke baare mein batayein..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="btn-primary w-full">
              Feedback Bhejein
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function GuestPage({ onBack }) {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-50 glass border-x-0 border-t-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="text-lg font-extrabold">
            Stream<span className="text-brand-400">Hub</span>
          </span>
          <div className="flex gap-2">
            <a
              href="#gallery"
              className="hidden text-sm text-zinc-300 hover:text-white sm:inline-block sm:px-2"
            >
              Gallery
            </a>
            <a
              href="#join"
              className="hidden text-sm text-zinc-300 hover:text-white sm:inline-block sm:px-2"
            >
              Join
            </a>
            <button onClick={onBack} className="btn-ghost !px-4 !py-2 text-sm">
              Login / Signup
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        <div
          className="blob absolute right-0 top-10 h-80 w-80 rounded-full bg-fuchsia-600/30 blur-3xl"
          style={{ animationDelay: "3s" }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-zinc-300">
            <span className="live-dot h-2 w-2 rounded-full bg-rose-500" /> Guest
            Preview
          </span>
          {/* <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Let's Meet{" "}
            <span className="bg-gradient-to-r from-brand-400 via-fuchsia-400 to-accent bg-clip-text text-transparent">
              guys
            </span>
          </h1> */}
          <p className="mx-auto max-w-2xl text-zinc-400">
            Live streams, photos, videos aur fun frames, everything together.
            ...
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button onClick={onBack} className="btn-primary w-full sm:w-auto">
              Signup
            </button>
            <a href="#gallery" className="btn-ghost w-full sm:w-auto">
              Explore Gallery
            </a>
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Schedule: {SCHEDULE_TEXT}
          </p>
        </div>
      </section>

      {/* Features */}
      <Section id="features" title="What's see" subtitle="All for Subscriber">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-6 transition duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section
        id="gallery"
        title="Photos, Videos & Frames"
        subtitle="Unique moments from our streams"
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((g) => (
            <div
              key={g.title}
              className={`group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl bg-gradient-to-br ${g.grad} p-4 transition duration-500 hover:scale-[1.02]`}
            >
              {g.img ? (
                <img
                  src={g.img}
                  alt={g.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              ) : (
                <span
                  className={`absolute inset-0 grid place-items-center bg-gradient-to-br ${g.grad} text-5xl opacity-80 transition group-hover:scale-110`}
                >
                  {g.emoji}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="relative m-3 w-full rounded-xl bg-black/40 p-3 backdrop-blur">
                <span className="text-xs font-semibold text-brand-400">
                  {g.type}
                </span>
                <p className="text-sm font-semibold text-white">{g.title}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How to join */}
      <Section
        id="join"
        title="How to Get Access"
        subtitle="Five easy steps to subscribe"
      >
        <div className="mx-auto max-w-2xl space-y-4">
          {steps.map((s, i) => (
            <div key={s.title} className="glass flex gap-4 rounded-2xl p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-600 font-bold">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="glass mx-auto mt-8 max-w-md rounded-3xl p-8 text-center">
          <p className="text-sm text-zinc-400">Monthly Subscription</p>
          <p className="mt-2 text-5xl font-extrabold">
            ₹{PRICE}
            <span className="text-base font-medium text-zinc-400">
              {" "}
              / month
            </span>
          </p>
          <button onClick={onBack} className="btn-primary mt-6 w-full">
            Sign Up Now
          </button>
        </div>
      </Section>

      {/* Feedback */}
      <Section
        id="feedback"
        title="What People Say"
        subtitle="Reviews and feedback"
      >
        <Feedback />
      </Section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} StreamHub. Built with React, Vite, Tailwind
        CSS &amp; ZEGOCLOUD.
      </footer>
    </div>
  );
}
