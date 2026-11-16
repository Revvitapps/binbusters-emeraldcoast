"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

/** Registers the service worker in production only. */
export function Pwa({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, [enabled]);
  return null;
}

/**
 * Install prompt: from the second visit, or right after a request is sent (bb:installable event).
 * Native prompt on Chromium, Share-sheet steps on iOS, hidden when already installed, dismissal remembered.
 */
export function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [show, setShow] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone;
    if (standalone) return;
    let dismissed = false;
    let visits = 0;
    try {
      dismissed = localStorage.getItem("bb.install.dismissed") === "1";
      visits = Number(localStorage.getItem("bb.visits") || "0") + 1;
      if (!sessionStorage.getItem("bb.counted")) {
        localStorage.setItem("bb.visits", String(visits));
        sessionStorage.setItem("bb.counted", "1");
      } else visits -= 1;
    } catch {}
    if (dismissed) return;
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIos(isIos);
    const onBip = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
      if (visits >= 2) setShow(true);
    };
    const onKey = () => setShow(true);
    window.addEventListener("beforeinstallprompt", onBip);
    window.addEventListener("bb:installable", onKey);
    if (isIos && visits >= 2) setShow(true);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBip);
      window.removeEventListener("bb:installable", onKey);
    };
  }, []);

  if (!show || (!evt && !ios)) return null;

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem("bb.install.dismissed", "1");
    } catch {}
  };

  return (
    <div className="install" role="dialog" aria-label="Install the Bin Busters app">
      <div>
        <strong>Keep Bin Busters on your phone</strong>
        {ios ? (
          <p>
            Tap <Share size={16} aria-label="Share" /> then “Add to Home Screen” to book and reach us in one tap.
          </p>
        ) : (
          <p>Book, check prices and reach us in one tap. No app store needed.</p>
        )}
      </div>
      {!ios && evt && (
        <button
          className="btn btn-sm"
          onClick={async () => {
            await evt.prompt();
            await evt.userChoice.catch(() => null);
            dismiss();
          }}
        >
          <Download size={16} aria-hidden /> Install
        </button>
      )}
      <button className="icon-btn" aria-label="Not now" onClick={dismiss}>
        <X aria-hidden />
      </button>
    </div>
  );
}
