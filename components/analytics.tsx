import Script from "next/script";

/** GA4 + click events for elements with data-event (book_click, call_click, email_click). */
export function Analytics({ gaId }: { gaId?: string }) {
  if (!gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('js',new Date());gtag('config','${gaId}');
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');if(!a||!window.gtag)return;
var ev=a.getAttribute('data-event')||(a.href.indexOf('tel:')===0?'call_click':a.href.indexOf('mailto:')===0?'email_click':null);
if(ev)gtag('event',ev,{link_url:a.href,page_path:location.pathname});});
`}</Script>
    </>
  );
}
