// Shared nav and footer for all GGN pages

function renderNav(activePage) {
  const pages = [
    { href: '/buyers.html', label: 'Buyers' },
    { href: '/sellers.html', label: 'Sellers' },
    { href: '/about.html', label: 'About' },
    { href: '/contact.html', label: 'Contact' },
    { href: '/realty.html', label: 'Join Our Realty Team', gold: true }
  ];

  const links = pages.map(p => `
    <li><a href="${p.href}" class="${p.gold ? 'gold-link' : ''}${activePage === p.label ? ' active' : ''}">${p.label}</a></li>
  `).join('');

  document.getElementById('nav-placeholder').innerHTML = `
    <nav id="mainNav">
      <a href="/index.html" class="nav-logo">
        <span class="name">GLADDEN GLOBAL</span>
        <span class="sub">Network</span>
      </a>
      <ul class="nav-links">${links}</ul>
      <a class="nav-cta" href="/contact.html">Connect With Us</a>
    </nav>
  `;

  window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
  });
}

function renderFooter() {
  document.getElementById('footer-placeholder').innerHTML = `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="name">GLADDEN GLOBAL NETWORK</div>
          <div class="sub">Veteran Owned &nbsp;|&nbsp; Maryland Based &nbsp;|&nbsp; Globally Operated</div>
          <p>A connection platform built to bring every participant in the real estate ecosystem together under one roof.</p>
        </div>
        <div class="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="/buyers.html">Buyers</a></li>
            <li><a href="/sellers.html">Sellers</a></li>
            <li><a href="/about.html">About</a></li>
            <li><a href="/contact.html">Contact</a></li>
            <li><a href="/realty.html">Join Our Realty Team</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="/buyers.html">Home Buying</a></li>
            <li><a href="/sellers.html">Home Selling</a></li>
            <li><a href="/buyers.html">VA and Military</a></li>
            <li><a href="/contact.html">Network Membership</a></li>
            <li><a href="/sellers.html">Relist Roadmap</a></li>
            <li><a href="/buyers.html">New Construction</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="tel:4102044070">(410) 204-4070</a></li>
            <li><a href="mailto:jon@thegladdenglobal.com">jon@thegladdenglobal.com</a></li>
            <li><a href="mailto:info@thegladdenglobal.com">info@thegladdenglobal.com</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Gladden Global Network. All rights reserved. &nbsp;|&nbsp; <a href="/privacy.html">Privacy Policy</a> &nbsp;|&nbsp; <a href="/terms.html">Terms of Use</a> &nbsp;|&nbsp; <span style="font-size:10px;color:rgba(255,255,255,0.15);">Powered by Gladden Global Realty Group LLC</span></p>
        <div class="veteran-badge">Veteran Owned Business</div>
      </div>
    </footer>
  `;
}

function handleContactForm(formId, successId) {
  document.getElementById(formId).addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      first_name: form.first_name ? form.first_name.value : '',
      last_name: form.last_name ? form.last_name.value : '',
      email: form.email ? form.email.value : '',
      phone: form.phone ? form.phone.value : '',
      interest: form.interest ? form.interest.value : '',
      message: form.message ? form.message.value : '',
      sms_consent: form.consent ? form.consent.checked : false,
      source: 'gladdenglobalnetwork.com'
    };
    fetch('https://grace.gglobalhomes.com/webhook/web', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(() => {});
    document.getElementById(successId).style.display = 'block';
    form.reset();
  });
}
