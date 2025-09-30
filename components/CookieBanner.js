// components/CookieBanner.js
import { useCookieConsent } from '../hooks/useCookieConsent';

const CookieBanner = () => {
  const { isVisible, acceptCookies } = useCookieConsent();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-5 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm flex-1">
          Мы используем файлы cookie, чтоб вам было удобнее пользоваться нашим сайтом. 
          Продолжая использование сайта, вы{' '}
          <a 
            href="/cookie" 
            className="text-blue-300 underline hover:text-blue-200"
          >
            соглашаетесь с использованием нами файлов cookie
          </a>
          . Нажимая кнопку «Принять» или продолжая пользоваться сайтом, вы соглашаетесь 
          на обработку файлов cookies и данных метрических систем. Если вы хотите запретить 
          обработку файлов cookie, отключите cookie в настройках вашего браузера.
        </p>
        <button 
          onClick={acceptCookies}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-bold whitespace-nowrap transition-colors"
        >
          Принять
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
