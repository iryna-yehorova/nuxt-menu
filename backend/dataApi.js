const axios = require('axios');

const http = axios.create({
    baseURL: 'https://api.bookcab.fr'
  });

async function getLocales() {
    try {
        console.log(http)
        const response = await http.get('/i18n/locales')
        return response.data
    } catch(err) {
        return err
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
        return err
    }
}

export {
    getLocales,
    getMenuItems
}