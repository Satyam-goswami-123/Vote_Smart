import { useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  useEffect(() => {
    // Add Google Translate Script
    const addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);

    // Add Init Function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,bn,te,mr,ta,ur,gu,kn,or,ml,pa', // Major Indian Languages
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    };
  }, []);

  return (
    <div className="language-selector" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.2rem 0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', height: '36px', overflow: 'hidden' }}>
      <Globe size={16} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
      <div id="google_translate_element" style={{ display: 'flex', alignItems: 'center' }}></div>
      <style>{`
        /* Hide Google Translate branding */
        .goog-te-gadget { font-family: inherit !important; font-size: 0 !important; color: transparent !important; display: flex; align-items: center; }
        .goog-te-gadget .goog-te-combo { margin: 0; padding: 0.1rem; border-radius: 0.25rem; border: none; background: transparent; color: var(--text-primary); font-family: inherit; font-size: 0.8rem; cursor: pointer; outline: none; width: 100px; }
        .goog-logo-link { display: none !important; }
        .goog-te-banner-frame { display: none !important; }
        .skiptranslate iframe { display: none !important; }
        body, html { top: 0 !important; position: static !important; }
      `}</style>
    </div>
  );
}
