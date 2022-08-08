import React, { useEffect, useState } from 'react';

interface InstallGuide {
  standAlone: boolean;
  open: boolean;
  agent: 'ios' | 'and';
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

function useInstallGuide(): [InstallGuide, () => void, () => void] {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent>();
  const [installGuide, setInstallGuide] = useState<InstallGuide>({
    agent: 'ios',
    standAlone: false,
    open: false,
  });

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod|safari/.test(userAgent);
  };

  const isRunningStandalone = () => {
    return window.matchMedia('(display-mode: standalone)').matches;
  };

  const installHandler = () => {
    if (deferredPrompt !== undefined) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('installed');
        }
        setDeferredPrompt(undefined);
      });
    } else {
      console.log('already installed');
    }
  };

  const closeGuide = () => setInstallGuide((prev) => ({ ...prev, open: false }));

  useEffect(() => {
    if (!isRunningStandalone()) {
      if (isIos()) {
        setInstallGuide((prev) => ({ ...prev, open: true }));
      } else {
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          setDeferredPrompt(e as BeforeInstallPromptEvent);

          return false;
        });
        setInstallGuide((prev) => ({ ...prev, agent: 'and', open: true }));
      }
    } else {
      setInstallGuide((prev) => ({ ...prev, standAlone: true, open: false }));
    }
  }, []);

  return [installGuide, installHandler, closeGuide];
}

export default useInstallGuide;
