module.exports = {
  title: 'Lumos',
  tagline: 'The Server and Desktop Development Framework for Nervos CKB',
  url: 'https://github.com/xying21/lumos_doc',
  baseUrl: '/lumos_doc/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'xying21', // Usually your GitHub org/user name.
  projectName: 'lumos_doc', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Lumos Documentation',
      logo: {
        alt: 'Lumos',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/quickstart/intro',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {href: 'https://nervosnetwork.github.io/lumos/globals.html', label: 'API Documenation', position: 'left'},
        {
          href: 'https://github.com/nervosnetwork/lumos',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
/*     footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    }, */
       footer: {
      links: [],
      logo: {},
      copyright: `Copyright © ${new Date().getFullYear()} Nervos`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/xying21/lumos_doc/tree/master',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
