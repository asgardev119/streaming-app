const URL = import.meta.env.VITE_APPS_SCRIPT_URL;

// async function post(body) {
//   const res = await fetch(URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'text/plain;charset=utf-8' },
//     body: JSON.stringify(body),
//   });
//   return res.json();
// }
async function post(body) {
  try {
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (err) {
    console.error('Sheet API error:', err);
    throw err;
  }
}
export async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const signup = (data) => post({ action: 'signup', ...data });
export const login = (data) => post({ action: 'login', ...data });
export const submitPayment = (data) => post({ action: 'payment', ...data });

export const setLive = (data) => post({ action: 'setLive', ...data });
export const getLive = () => post({ action: 'liveStatus' });