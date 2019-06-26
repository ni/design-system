module.exports = {
  pathPrefix: '/fuse',
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-ni-docs',
      options: {
        root: __dirname,
        subtitle: 'Fuse Design System',
        description: 'Documentation for the NI Fuse Design System',
        githubRepo: 'ni/design-system',
        sidebarCategories: {
          null: [
            'fuse/index',
            'fuse/design-tenets',
            // 'content-status',
          ],
          Style: [
            'fuse/style/colors',
            'fuse/style/icons',
            'fuse/style/text-capitalization',
            'fuse/style/typography',
          ],
          Elements: [
            'fuse/elements/application-window',
            'fuse/elements/buttons',
            'fuse/elements/checkboxes',
            'fuse/elements/color-picker',
            'fuse/elements/combo-boxes',
            'fuse/elements/dialogs',
            'fuse/elements/documents',
            'fuse/elements/dropdowns',
            'fuse/elements/filter-tree-view',
            'fuse/elements/group-boxes',
            'fuse/elements/html-editor',
            'fuse/elements/links',
            'fuse/elements/list-views',
            'fuse/elements/menus',
            'fuse/elements/notifications',
            'fuse/elements/overlay',
            'fuse/elements/panes',
            'fuse/elements/progress-indicators',
            'fuse/elements/radio-buttons',
            'fuse/elements/tables',
            'fuse/elements/tabs',
            'fuse/elements/text-blocks',
            'fuse/elements/text-boxes',
            'fuse/elements/timestamp',
            'fuse/elements/tips',
            'fuse/elements/toggle-groups',
            'fuse/elements/toolbars',
            'fuse/elements/trees',
          ],
          Patterns: [
            'fuse/patterns/confirmations',
            'fuse/patterns/empty-states',
            'fuse/patterns/errors',
          ],
          Resources: [
            'fuse/resources/code-samples',
            'fuse/resources/fonts',
          ]
        }
      }
    }
  ]
};
