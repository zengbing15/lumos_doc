import React from 'react';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Head from '@docusaurus/Head';


function Hero() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <header className="masthead">
	<div className="row">
       <div className="col">
        <h1>{siteConfig.title}</h1>

        <Link
          to={useBaseUrl("docs/introduction/about")}
          className="button button--primary button--outline button--lg"
        >
          Get Started
        </Link>
      </div>
	  <div className="col"><h1></h1><object type="image/svg+xml" data={useBaseUrl("img/lumos.svg")}><img src={useBaseUrl("img/lumos.svg")} /></object></div>
	</div>
    </header>
  );
}
       /* <h3>{siteConfig.tagline}</h3>*/
function Feature({ title, children, color = "primary" }) {
  const h2 = "text";
  return (
    <div className="col">
      <h2 className={"text--center text--" + color} style={{ color }}>
        {title}
      </h2>
      <p className="text--center">{children}</p>
    </div>
  );
}

function Body() {
  return (

    <main className="container">
	  
      <div className="row">

        <Feature title="Powerful">
          The <b>Lumos</b> framework with powerful modules saves you the hassle of creating code for CKB queries and transactions.
        </Feature>
        <Feature title="Easy Integration" color="#BA00AC">
         The functions, or more complicated sets and combinations of components make smart contracts integration on CKB much simpler.
        </Feature>
        <Feature title="Easy to Use" color="#00B100">
          The <b>Lumos</b> framework is open source, and can be used on Mac, Linux and windows machines.
        </Feature>
      </div>
	  
    </main>
  );
}
/*<script id="TelegramLiveChatLoader" data-bot="7CD95938-9E7D-11EB-A677-82FA22E822B5" src="https://livechatbot.net/assets/chat/js/loader.js"></script>*/
/*<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="bfc3eca2-568b-4181-9dda-8de6166b8a48";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>*/
export default function Home() {
  return (
    <Layout>
	<Head>/*<script async type="text/javascript" src="https://userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/85e4a005c7a14117b205fec853cbe30447112d747a6747e5a40a804d4bcf715a.js"></script>*/
</Head>
      <Hero />
      <Body />
	  
    </Layout>
  );
}
