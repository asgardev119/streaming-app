import { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

export default function StreamRoom({ roomId, userName, isHost }) {
  const containerRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) {
      setError('ZEGOCLOUD credentials missing hain. .env file mein VITE_ZEGO_APP_ID aur VITE_ZEGO_SERVER_SECRET add karein, phir server restart karein.');
      return;
    }

    const userID = 'user_' + Math.random().toString(36).slice(2, 10);

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: isHost ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience,
        },
      },
      showPreJoinView: true,
      maxUsers: 50,
      showLeavingView: false,
    });

    return () => {
      zp.destroy();
    };
  }, [roomId, userName, isHost]);

  if (error) {
    return (
      <div className="glass rounded-2xl p-6 text-center text-rose-300">
        {error}
      </div>
    );
  }

  return <div ref={containerRef} className="zego-container glass" />;
}
