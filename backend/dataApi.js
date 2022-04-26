const axios = require('axios');

const http = axios.create({
    baseURL: 'https://api.bookcab.fr'
  });

async function getLocales() {
    try {
        const response = await http.get('/i18n/locales')
        return response.data
    } catch(err) {
        return new Error(err.text);
    }
}

async function getMenuItems(locale) {
    try {
        const response = await http.get('/menus', {
            params: {
                _locale: locale
            }   
        })
        return response.data
    } catch(err) {
        return new Error(err.text);
    }
}

export {
    getLocales,
    getMenuItems
}