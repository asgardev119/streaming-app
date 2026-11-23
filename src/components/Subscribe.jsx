import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { submitPayment } from '../lib/sheet.js';

const UPI_ID = import.meta.env.VITE_UPI_ID;
const UPI_NAME = import.meta.env.VITE_UPI_NAME || 'StreamHub';
const AMOUNT = 199;

const upiUrl =
  `upi://pay?pa=${encodeURIComponent(UPI_ID)}` +
  `&pn=${encodeURIComponent(UPI_NAME)}` +
  `&am=${AMOUNT}&cu=INR` +
  `&tn=${encodeURIComponent('StreamHub Monthly Subscription')}`;

export default function Subscribe({ user, onLogout }) {
  const [utr, setUtr] = useState('');
  const [msg, setMsg] = useState('');
  const pending = user.status === 'Payment Submitted';

  const submit = async (e) => {
    e.preventDefault();
    if (!utr.trim()) return;
    const r = await submitPayment({ email: user.email, passHash: user.passHash, utr: utr.trim() });
    setMsg(r.ok ? 'Payment submit ho gaya. Admin verify karega.' : r.error);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="glass rounded-3xl p-6 text-center sm:p-8">
        <h2 className="text-2xl font-bold">Subscription Lein</h2>
        <p className="mt-1 text-sm text-zinc-400">Hi {user.name}, ₹{AMOUNT} / month</p>

        <div className="mx-auto mt-6 w-fit rounded-2xl bg-white p-4">
          <QRCodeSVG value={upiUrl} size={200} />
        </div>
        <p className="mt-3 text-sm text-zinc-300">UPI ID: <span className="font-semibold">{UPI_ID}</span></p>

        {pending ? (
          <p className="mt-6 rounded-xl bg-amber-500/10 p-4 text-sm text-amber-300">
            Aapka payment verify ho raha hai. Admin approve karte hi access mil jayega.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-3">
            <input className="input" placeholder="UPI Transaction ID (UTR)" value={utr} onChange={(e) => setUtr(e.target.value)} />
            <button type="submit" className="btn-primary w-full">Payment Submit Karein</button>
          </form>
        )}

        {msg && <p className="mt-4 text-sm text-emerald-300">{msg}</p>}

        <button onClick={onLogout} className="mt-6 text-sm text-zinc-500 hover:text-white">Logout</button>
      </div>
    </div>
  );
}