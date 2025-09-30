// hooks/useCookieConsent.js
import { useState, useEffect } from 'react';

export const useCookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookieConsent');
      const expiry = localStorage.getItem('cookieConsentExpiry');
      
      if (!consent) {
        setIsVisible(true);
        return;
      }
      
      // Проверяем срок действия согласия
      if (expiry) {
        const expiryDate = new Date(expiry);
        if (expiryDate < new Date()) {
          // Срок истек, показываем баннер снова
          localStorage.removeItem('cookieConsent');
          localStorage.removeItem('cookieConsentExpiry');
          setIsVisible(true);
        }
      }
    };

    checkConsent();
  }, []);

  const acceptCookies = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 365);
    
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentExpiry', expiryDate.toISOString());
    setIsVisible(false);
  };

  return { isVisible, acceptCookies };
};
