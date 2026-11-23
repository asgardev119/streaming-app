export function istNow() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
}

// Sat (6) aur Sun (0), raat 10 PM se 12 AM tak
export function isLiveNow(d = istNow()) {
  const day = d.getDay();
  const hour = d.getHours();
  return (day === 0 || day === 6) && hour >= 22;
}

export const SCHEDULE_TEXT = 'Sat & Sun · raat 10 PM – 12 AM (IST)';