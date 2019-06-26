import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mcpolicyeditor.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

const POLICY_EDITOR_I18N = {
    header: 'Policy settings',
    tags: {
        header: 'Tag service',
        permissions: 'Permissions',
        read: 'Read',
        write: 'Write',
        modify: 'Modify',
        delete: 'Delete',
        create: 'Create',
        path: 'Tag path',
        pathDescription: 'Set tag permissions based on tag path',
        wildcardPlaceholder: 'Wildcard path...',
        helpLink: 'Learn more about using wildcard syntax.'
    },
    messages: {
        header: 'Message service',
        permissions: 'Permissions',
        subscribe: 'Subscribe',
        publish: 'Publish',
        topic: 'Message Topic',
        topicDescription: 'Set permissions to specific topic or topics',
        wildcardPlaceholder: 'Wildcard path...',
        helpLink: 'Learn more about using wildcard syntax.'
    },
    create: 'Create',
    update: 'Update',
    delete: 'Delete',
    cancel: 'Cancel'
};

storiesOf('Policy Editor', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('Policy Editor', () => {
        const el = document.createElement('mc-policy-editor');
        el.i18n = POLICY_EDITOR_I18N;
        el.policy = {
            name: 'my-policy-name',
            tagPathFilter: 'my-tag-path',
            messageTopicFilter: 'my-message-topic',
            tagActions: ['read', 'write'],
            messageActions: ['publish']
        };
        return el;
    });
