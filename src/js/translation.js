export function initTranslation() {
  // Add Google Translate Element
  const gtDiv = document.createElement('div');
  gtDiv.id = 'google_translate_element';
  gtDiv.style.display = 'none';
  document.body.appendChild(gtDiv);

  // Add Google Translate Script
  window.googleTranslateElementInit = function() {
    new window.google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'ar,en',
      autoDisplay: false
    }, 'google_translate_element');
  };

  const gtScript = document.createElement('script');
  gtScript.type = 'text/javascript';
  gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(gtScript);

  // Handle Toggle Button
  const langToggles = document.querySelectorAll('.lang-toggle');
  
  // Check current language from cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const updateUI = () => {
    const googtrans = getCookie('googtrans');
    const isAr = googtrans && googtrans.endsWith('/ar');
    
    langToggles.forEach(btn => {
      btn.textContent = isAr ? 'EN' : 'AR';
    });
    
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  };

  // Initial UI update
  updateUI();
  
  langToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const googtrans = getCookie('googtrans');
      const isAr = googtrans && googtrans.endsWith('/ar');
      const targetLang = isAr ? 'en' : 'ar';
      
      // Set cookie for Google Translate
      document.cookie = `googtrans=/en/${targetLang}; path=/`;
      if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        document.cookie = `googtrans=/en/${targetLang}; domain=.${location.hostname}; path=/`;
      }
      
      // Reload to apply translation
      window.location.reload();
    });
  });
}
