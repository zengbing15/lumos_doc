import React from 'react';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

function Hero() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <header className="hero">
      <div className="container margin-vert--lg">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <Link
          to={useBaseUrl("docs/introduction/intro")}
          className="button button--primary button--outline button--lg"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

function Feature({ title, children, color = "primary" }) {
  const h2 = "text";
  return (
    <div className="col">
      <h2 className={"text--center text--" + color} style={{ color }}>
        {title}
      </h2>
      <p className="text--justify">{children}</p>
    </div>
  );
}

function Body() {
  return (
    <main className="container">
      <div className="row margin-vert--xl">
        <Feature title="Convenient">
          The <b>Lumos</b> framework provides ... for developing CKB DApps.
        </Feature>
        <Feature title="Safe" color="#BA00AC">
          The <b>Lumos</b> framework prevents common mistakes people make when...
        </Feature>
        <Feature title="Powerful" color="#00B100">
          The <b>Lumos</b> framework can be used to implement 
        </Feature>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Body />
    </Layout>
  );
}
