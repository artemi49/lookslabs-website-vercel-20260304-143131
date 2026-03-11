(function () {
  var KEY = 'lookslab_consent';
  var saved = localStorage.getItem(KEY);
  var isEN = (document.documentElement.lang || 'de') === 'en';

  if (saved === 'all') { loadThirdParty(); return; }
  if (saved === 'necessary') { loadThirdParty(); return; }

  showBanner();

  function showBanner() {
    var b = document.createElement('div');
    b.id = 'consent-banner';
    b.innerHTML = isEN
      ? '<div class="consent-inner"><p>We use third-party services (e.g.&nbsp;Google Fonts, GetWaitlist) that may transfer data to servers outside the EU. Details in our <a href="./privacy.html">Privacy Policy</a>.</p><div class="consent-btns"><button id="cb-accept" class="consent-btn cb-accept">Accept All</button><button id="cb-necessary" class="consent-btn cb-necessary">Necessary Only</button></div></div>'
      : '<div class="consent-inner"><p>Wir nutzen Drittanbieter-Dienste (z.\u00a0B. Google Fonts, GetWaitlist), die Daten an Server au\u00dferhalb der EU \u00fcbertragen k\u00f6nnen. Details in unserer <a href="./datenschutz.html">Datenschutzerkl\u00e4rung</a>.</p><div class="consent-btns"><button id="cb-accept" class="consent-btn cb-accept">Alle akzeptieren</button><button id="cb-necessary" class="consent-btn cb-necessary">Nur Notwendige</button></div></div>';
    document.body.appendChild(b);

    document.getElementById('cb-accept').onclick = function () {
      localStorage.setItem(KEY, 'all');
      b.remove();
      loadThirdParty();
    };
    document.getElementById('cb-necessary').onclick = function () {
      localStorage.setItem(KEY, 'necessary');
      b.remove();
      loadThirdParty();
    };
  }

  function loadThirdParty() {
    var c = document.getElementById('getWaitlistContainer');
    if (!c) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css';
    document.head.appendChild(link);
    var s = document.createElement('script');
    s.src = 'https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js';
    document.body.appendChild(s);
  }

  function showWaitlistFallback() {
    var c = document.getElementById('getWaitlistContainer');
    if (!c) return;
    c.innerHTML = isEN
      ? '<div class="waitlist-consent-note"><p>The waitlist requires third-party services.<br>Please accept to use it.</p><button onclick="localStorage.setItem(\'lookslab_consent\',\'all\');location.reload();">Accept &amp; Load</button></div>'
      : '<div class="waitlist-consent-note"><p>Die Warteliste ben\u00f6tigt Drittanbieter-Dienste.<br>Bitte akzeptiere, um sie zu nutzen.</p><button onclick="localStorage.setItem(\'lookslab_consent\',\'all\');location.reload();">Akzeptieren &amp; laden</button></div>';
  }
})();
