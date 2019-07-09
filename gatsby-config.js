module.exports = {
  pathPrefix: '/design-system',
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
            'index',
            'design-tenets',
            // 'content-status',
          ],
          Style: [
            'style/colors',
            // 'style/icons',
            'style/text-capitalization',
            'style/typography',
          ],
          Elements: [
            'elements/application-window',
            'elements/buttons',
            'elements/checkboxes',
            'elements/color-picker',
            'elements/combo-boxes',
            'elements/dialogs',
            'elements/documents',
            'elements/dropdowns',
            'elements/filter-tree-view',
            'elements/group-boxes',
            'elements/html-editor',
            'elements/links',
            'elements/list-views',
            'elements/menus',
            'elements/notifications',
            'elements/overlay',
            'elements/panes',
            'elements/progress-indicators',
            'elements/radio-buttons',
            'elements/tables',
            'elements/tabs',
            'elements/text-blocks',
            'elements/text-boxes',
            'elements/timestamp',
            'elements/tips',
            'elements/toggle-groups',
            'elements/toolbars',
            'elements/trees',
          ],
          Patterns: [
            'patterns/confirmations',
            'patterns/empty-states',
            'patterns/errors',
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
