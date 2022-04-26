const axios = require('axios').default;

async function getLocales() {
    try {
        const response = await axios.get('https://api.bookcab.fr/i18n/locales')
        return response.data
    } catch(err) {
        console.log(err)
    }
}

async function getMenuItems(locale) {
    try {
        const response = await axios.get('https://api.bookcab.fr/menus', {
            params: {
                _locale: locale
            }   
        })
        return response.data
    } catch(err) {
        console.log(err)
    }
}

export {
    getLocales,
    getMenuItems
}