window.onload = function () {
    function configureListBoxes() {
        function configureGestureListBox() {
            const gestureListbox = document.getElementById('gestureListBox');

            gestureListbox.itemTemplate = 'multiLineTemplate';

            const actionButtons = gestureListbox.getElementsByClassName('secondLine');
            let button;

            for (let i = 0; i < actionButtons.length; i++) {
                button = document.createElement('jqx-button');
                button.id = 'actionButton';
                button.classList.add('material', 'flat');
                button.innerHTML = '<i class="material-icons">&#xE8B8;</i>';
                actionButtons[i].appendChild(button);
            }

            function handleSwipe(event) {
                const target = event.originalEvent.target.closest('jqx-list-item'),
                    actionButton = document.getElementById('actionButton'),
                    type = event.type === 'swipeleft' ? 'left' : 'right';
                let isSameItem, reset, oldSwipeType;

                if (!target) {
                    return;
                }

                target.$.removeClass('swipe-right-left');

                const swipedLeftItems = this.getElementsByClassName('swipe-left'),
                    swipedRightItems = this.getElementsByClassName('swipe-right');

                if (swipedLeftItems.length === 1) {
                    oldSwipeType = 'left';
                    isSameItem = swipedLeftItems[0] === target ? true : false;
                    reset = isSameItem && type === 'left' ? true : false;
                    swipedLeftItems[0].$.removeClass('swipe-left');
                }
                else if (swipedRightItems.length === 1) {
                    oldSwipeType = 'right';
                    isSameItem = swipedRightItems[0] === target ? true : false;
                    reset = isSameItem && type === 'right' ? true : false;
                    swipedRightItems[0].$.removeClass('swipe-right');
                }

                if (isSameItem && oldSwipeType !== 'left') {
                    target.$.addClass('swipe-right-left');
                }

                if (reset) {
                    return;
                }

                if (type === 'right') {
                    target.querySelector('jqx-button').innerHTML = '<i class="material-icons">&#xE307;</i>';
                }
                else {

                    target.querySelector('jqx-button').innerHTML = '<i class="material-icons">&#xE2C4;</i>';
                }

                target.$.addClass('swipe-' + type);

            }

            gestureListbox.addEventListener('swipeleft', handleSwipe);
            gestureListbox.addEventListener('swiperight', handleSwipe);
        }

        function configureDemoListBoxes() {
            const switchWifi = document.createElement('jqx-switch-button'),
                switchBluetooth = document.createElement('jqx-switch-button'),
                settingsMenu = document.getElementById('settingsMenu'),
                phoneBook = document.getElementById('phoneBook'),
                twoLineList = document.getElementById('twoLineList'),
                twoLineCheckList = document.getElementById('twoLineCheckList'),
                deleteButton = document.getElementById('deleteButton'),
                people = phoneBook.items, 
                iconLabels = [
                    'network_wifi',
                    'bluetooth',
                    'data_usage',
                    'usb',
                    '',
                    'settings',
                    'settings_phone',
                    'notifications',
                    'stay_primary_portrait',
                    'storage',
                    'battery_std',
                    'apps',
                    'people',
                    'gps_fixed',
                    'security',
                    'account_box',
                    'home',
                    'keyboard',
                    'settings_backup_restore',
                    'access_time',
                    'accessibility',
                    'print',
                    'phone_android',
                    'help'
                ];
            let button;

            switchWifi.classList.add('material');
            switchBluetooth.classList.add('material');

            switchWifi.checked = true;

            settingsMenu.itemTemplate = 'itemTemplate';

            const icons = document.getElementsByClassName('primaryAction');

            settingsMenu.getElementsByClassName('secondaryAction')[0].appendChild(switchWifi);
            settingsMenu.getElementsByClassName('secondaryAction')[1].appendChild(switchBluetooth);

            for (let i = 0; i < icons.length; i++) {
                icons[i].children[0].textContent = iconLabels[i];
            }

            phoneBook.itemTemplate = 'itemTemplate';

            for (let i = 0; i < people.length; i++) {
                button = document.createElement('jqx-button');
                button.classList.add('material', 'flat');
                button.innerHTML = '<i class="material-icons">&#xE0C9;</i>';
                people[i].getElementsByClassName('secondaryAction')[0].appendChild(button);
            }

            twoLineList.itemTemplate = 'multiLineTemplate';

            const twoLineListItems = twoLineList.items;
            let secondLineContent = [
                    'General Manager',
                    'Developer',
                    'Musician',
                    'Architect',
                    'Janitor',
                    'Waitress',
                    'Developer',
                    'CEO',
                    'Team leader',
                    'Technical advisor',
                    'Human resources(HR)',
                    'Financial advisor',
                    'Consultant',
                    'Human resources(HR)',
                    'Tester',
                    'Quality Assurance(QA)',
                    'Software Developer',
                ];

            for (let i = 0; i < twoLineListItems.length; i++) {
                twoLineListItems[i].getElementsByClassName('secondLine')[0].textContent = secondLineContent[i];
            }

            twoLineCheckList.itemTemplate = 'multiLineTemplate';

            const twoLineCheckListItems = twoLineCheckList.items;
            secondLineContent = [
                    '650KB',
                    '105MB',
                    '497MB',
                    '1.2MB',
                    '345KB',
                    '1.2GB',
                    '12MB',
                    '2.4MB',
                    '7.5GB',
                    '1.72GB',
                    '450MB',
                    '480KB',
                    '120KB',
                    '12.7MB',
                    '784MB',
                    '920KB',
                    '1.7MB'
                ];

            for (let i = 0; i < twoLineCheckListItems.length; i++) {
                twoLineCheckListItems[i].getElementsByClassName('secondLine')[0].textContent = secondLineContent[i];
            }

            twoLineCheckList.addEventListener('change', function () {
                if (this.selectedIndexes.length > 0) {
                    deleteButton.$.removeClass('jqx-visibility-hidden');
                }
                else {
                    deleteButton.$.addClass('jqx-visibility-hidden');
                }
            });

            deleteButton.addEventListener('click', function () {
                for (let index = twoLineCheckList.selectedIndexes.length - 1; index > -1; index--) {
                    twoLineCheckList.remove(twoLineCheckList.selectedIndexes[index])
                }
            });
        }

        function configureThemedListBoxes() {
            const switchVibration = document.createElement('jqx-switch-button'),
                switchVibrationDark = document.createElement('jqx-switch-button'),
                switchRingtone = document.createElement('jqx-switch-button'),
                switchRingtoneDark = document.createElement('jqx-switch-button'),
                switchNotificationLight = document.createElement('jqx-switch-button'),
                switchNotificationLightDark = document.createElement('jqx-switch-button'),
                switchNotificationsLockScreen = document.createElement('jqx-switch-button'),
                switchNotificationsLockScreenDark = document.createElement('jqx-switch-button'),
                ringSlider = document.createElement('jqx-slider'),
                ringSliderDark = document.createElement('jqx-slider'),
                mediaSlider = document.createElement('jqx-slider'),
                mediaSliderDark = document.createElement('jqx-slider'),
                alarmSlider = document.createElement('jqx-slider'),
                alarmSliderDark = document.createElement('jqx-slider'),
                listBoxLight = document.getElementById('listBoxLight'),
                listBoxDark = document.getElementById('listBoxDark');

            const listBoxLightSecondaryAction = listBoxLight.getElementsByClassName('secondLine'),
                listBoxDarkSecondaryAction = listBoxDark.getElementsByClassName('secondLine');

            function sliderControl() {
                switch (this) {
                    case mediaSlider:
                    case mediaSliderDark:
                        this.previousElementSibling.textContent = this.value === this.min ? 'volume_off' : 'volume_up';
                        break;
                    case alarmSlider:
                    case alarmSliderDark:
                        this.previousElementSibling.textContent = this.value === this.min ? 'alarm_off' : 'alarm';
                        break;
                    case ringSlider:
                    case ringSliderDark:
                        this.previousElementSibling.textContent = this.value === this.min ? 'notifications_off' : 'notifications';
                        break;
                }
            }

            [switchVibration, switchVibrationDark, switchRingtone,
            switchRingtoneDark, switchNotificationLight, switchNotificationLightDark,
            switchNotificationsLockScreen, switchNotificationsLockScreenDark,
            ringSlider, ringSliderDark, mediaSlider, mediaSliderDark, alarmSlider, alarmSliderDark
            ].map(function (element) {
                element.classList.add('material');
            });

            [ringSlider, ringSliderDark, mediaSlider, mediaSliderDark, alarmSlider, alarmSliderDark].map(function (element) {
                element.scalePosition = 'none';
            }
            );
            mediaSlider.value = mediaSliderDark.value = mediaSlider.max / 2;
            ringSlider.value = ringSliderDark.value = ringSlider.max / 1.5;
            alarmSlider.value = alarmSliderDark.value = alarmSlider.max;

            switchVibration.checked = switchVibrationDark.checked = switchNotificationLight.checked = switchNotificationLightDark.checked = true;

            listBoxLight.itemTemplate = listBoxDark.itemTemplate = 'multiLineTemplate';

            // Light themed list box
            listBoxLightSecondaryAction[2].innerHTML = '<i class="material-icons">&#xE050;</i>';
            listBoxLightSecondaryAction[2].appendChild(mediaSlider);
            listBoxLightSecondaryAction[3].innerHTML = '<i class="material-icons">&#xE855;</i>';
            listBoxLightSecondaryAction[3].appendChild(alarmSlider);
            listBoxLightSecondaryAction[4].innerHTML = '<i class="material-icons">&#xE7F4;</i>';
            listBoxLightSecondaryAction[4].appendChild(ringSlider);
            listBoxLightSecondaryAction[5].parentElement.classList.add('single-line');
            listBoxLightSecondaryAction[5].appendChild(switchVibration);
            listBoxLightSecondaryAction[8].parentElement.classList.add('single-line');
            listBoxLightSecondaryAction[8].appendChild(switchRingtone);
            listBoxLightSecondaryAction[11].parentElement.classList.add('single-line');
            listBoxLightSecondaryAction[11].appendChild(switchNotificationLight);
            listBoxLightSecondaryAction[14].parentElement.classList.add('single-line');
            listBoxLightSecondaryAction[14].appendChild(switchNotificationsLockScreen);

            //Dark themed list box
            listBoxDarkSecondaryAction[2].innerHTML = '<i class="material-icons">&#xE050;</i>';
            listBoxDarkSecondaryAction[2].appendChild(mediaSliderDark);
            listBoxDarkSecondaryAction[3].innerHTML = '<i class="material-icons">&#xE855;</i>';
            listBoxDarkSecondaryAction[3].appendChild(alarmSliderDark);
            listBoxDarkSecondaryAction[4].innerHTML = '<i class="material-icons">&#xE7F4;</i>';
            listBoxDarkSecondaryAction[4].appendChild(ringSliderDark);
            listBoxDarkSecondaryAction[5].parentElement.classList.add('single-line');
            listBoxDarkSecondaryAction[5].appendChild(switchVibrationDark);
            listBoxDarkSecondaryAction[8].parentElement.classList.add('single-line');
            listBoxDarkSecondaryAction[8].appendChild(switchRingtoneDark);
            listBoxDarkSecondaryAction[11].parentElement.classList.add('single-line');
            listBoxDarkSecondaryAction[11].appendChild(switchNotificationLightDark);
            listBoxDarkSecondaryAction[14].parentElement.classList.add('single-line');
            listBoxDarkSecondaryAction[14].appendChild(switchNotificationsLockScreenDark);

            //Additional text
            listBoxLightSecondaryAction[7].textContent = listBoxDarkSecondaryAction[7].textContent = 'Breeze';
            listBoxLightSecondaryAction[9].textContent = listBoxDarkSecondaryAction[9].textContent = 'Notification';
            listBoxLightSecondaryAction[15].textContent = listBoxDarkSecondaryAction[15].textContent = 'No apps can read notifications';


            mediaSlider.addEventListener('change', sliderControl);
            mediaSliderDark.addEventListener('change', sliderControl);
            alarmSlider.addEventListener('change', sliderControl);
            alarmSliderDark.addEventListener('change', sliderControl);
            ringSlider.addEventListener('change', sliderControl);
            ringSliderDark.addEventListener('change', sliderControl);
        }

        configureDemoListBoxes();
        configureThemedListBoxes();
        configureGestureListBox();
    }

    configureListBoxes();
}