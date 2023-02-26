import { useRouter } from "next/router";
import Script from "next/script";

interface Props {
  id: string | number;
}
export const DisqusChat = ({ id }: Props) => {
  const { asPath } = useRouter();
  return (
    <>
      <div id="disqus_thread"></div>
      <Script id="disqus">
        {`
              /**
               *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
               *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
               /*
               var disqus_config = function () {
               this.page.url = "${asPath}";  // Replace PAGE_URL with your page's canonical URL variable
               this.page.identifier = "${id}"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
               };
               */
               (function() { // DON'T EDIT BELOW THIS LINE
               var d = document, s = d.createElement('script');
               s.src = 'https://airt-1.disqus.com/embed.js';
               s.setAttribute('data-timestamp', +new Date());
               (d.head || d.body).appendChild(s);
               })();
            `}
      </Script>
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript">
          comments powered by Disqus.
        </a>
      </noscript>
    </>
  );
};
