module.exports = {
  title: 'TypeScript and JavaScript Framework for CKB DApps',
  tagline: 'The Development Framework for Nervos CKB DApps',
  url: 'https://github.com/xying21/lumos_doc',
  baseUrl: '/lumos_doc/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'xying21', // Usually your GitHub org/user name.
  projectName: 'lumos_doc', // Usually your repo name.

  plugins: ['docusaurus-plugin-sass'],
  
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
	
	hideableSidebar: true,
	prism: {
      theme: require('prism-react-renderer/themes/nightOwlLight'),
    },
    navbar: {
		hideOnScroll: true,
		
		
		logo: {
			alt: 'Lumos',
			src: 'img/nervoslumos.svg',
			
      },
      items: [
        {
          href: 'https://github.com/nervosnetwork/lumos',
		  className: 'github-link',
          'aria-label': 'GitHub',
          position: 'right',
        },
		{
          to: 'docs/introduction/intro',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {href: 'https://nervosnetwork.github.io/lumos/globals.html', label: 'API Documenation', position: 'right'}
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
		  showLastUpdateTime: true,
        },
        /*blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },*/
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
