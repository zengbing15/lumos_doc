module.exports = {
  title: 'A TypeScript and JavaScript Framework for CKB DApps',
  tagline: 'The Development Framework for Nervos CKB DApps',
  url: 'https://github.com/xying21/lumos_doc',
  baseUrl: '/lumos_doc/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'xying21', // Usually your GitHub org/user name.
  projectName: 'lumos_doc', // Usually your repo name.

  plugins: ['docusaurus-plugin-sass' ],
  
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
	algolia: {
      apiKey: '4271cb4b044b51b74fd4bfab962db5ed',
      indexName: 'lumos',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
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
    footer: {
      style: 'light',
      links: [
        {
          title: 'About',
          items: [
            {
              label: 'About This Guide',
              to: 'docs/introduction/about',
            },
            {
              label: 'What is Lumos?',
              to: 'docs/introduction/intro',
            },
          ],
        },
        {
          title: 'Setup',
          items: [
            {
              label: 'Set Up the Development Environment',
              to: 'docs/preparation/setupsystem',
            },
            {
              label: 'Install Lumos Packages',
              to: 'docs/guides/installlumos',
            }
          ],
        },
        {
          title: 'Config',
          items: [
            {
              label: 'Set Up the Config Manager',
              to: 'docs/guides/config',
            },
			{
              label: 'Set Up the Lumos Indexer',
              to: 'docs/guides/indexer',
            },
          ],
        }
      ],
	  logo: {
                alt: 'Lumos Documentation',
                src: '/img/nervoslumos.svg',
                
            },
      copyright: `Copyright © ${new Date().getFullYear()} Nervos Foundation. All Rights Reserved.`,
    },
/*        footer: {
      links: [],
      logo: {},
      copyright: `Copyright © ${new Date().getFullYear()} Nervos`,
    }, */
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
