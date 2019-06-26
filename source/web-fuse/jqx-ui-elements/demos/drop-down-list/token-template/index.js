window.onload = function () {
    document.querySelector('jqx-drop-down-list').addEventListener('change', function () {
        const tokens = this.getElementsByClassName('jqx-token');

        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].textContent.indexOf('United States') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/274_Ensign_Flag_Nation_states-256.png';
            }
            else if (tokens[i].textContent.indexOf('United Kingdom') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/273_Ensign_Flag_Nation_kingdom-256.png';
            }
            else if (tokens[i].textContent.indexOf('China') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/57_Ensign_Flag_Nation_china-256.png';
            }
            else if (tokens[i].textContent.indexOf('Russia') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/210_Ensign_Flag_Nation_russia-256.png';
            }
            else if (tokens[i].textContent.indexOf('Italy') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/124_Ensign_Flag_Nation_italy-256.png';
            }
            else if (tokens[i].textContent.indexOf('Sweden') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/247_Ensign_Flag_Nation_sweden-256.png';
            }
            else if (tokens[i].textContent.indexOf('Bulgaria') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/43_Ensign_Flag_Nation_bulgaria-256.png';
            }
            else if (tokens[i].textContent.indexOf('Switzerland') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/248_Ensign_Flag_Nation_switzerland-256.png';
            }
            else if (tokens[i].textContent.indexOf('Ireland') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/121_Ensign_Flag_Nation_ireland-256.png';
            }
            else if (tokens[i].textContent.indexOf('France') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/92_Ensign_Flag_Nation_france-256.png';
            }
            else if (tokens[i].textContent.indexOf('Romania') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/209_Ensign_Flag_Nation_romania-256.png';
            }
            else if (tokens[i].textContent.indexOf('Argentina') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/16_Ensign_Flag_Nation_Argentina-256.png';
            }
            else if (tokens[i].textContent.indexOf('Brazil') > -1) {
                tokens[i].getElementsByClassName('avatar')[0].src = 'https://cdn1.iconfinder.com/data/icons/ensign-11/512/38_Ensign_Flag_Nation_brazil-256.png';
            }
        }
    });
}