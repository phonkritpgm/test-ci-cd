export enum cookieName{
    user = "user",
    userInfo = "userinfo"
}

export const timeOut = {
    TCustom: 10,
    T10M: 10,
    T20M: 20,
    T30M: 30,
    T40M: 40,
    T50M: 50,
    T60M: 60,
    TOneDay: (60 * 24),
}

class Cookie{
    // returns the cookie with the given name,
    // or undefined if not found
    static getCookie(cName: string): string {
        const name: string = btoa(encodeURIComponent(cName)) + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded .split('; ');
        let res: string = "";
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return decodeURIComponent(atob(res));
    }

    static setCookie(name: string, value: string, attributes: any = {}) {
        attributes = {
            path: '/',
            // add other defaults here if necessary
            ...attributes
        };
        
        if (attributes.expires instanceof Date) {
            attributes.expires = attributes.expires.toDateString();
        }
    
        let updatedCookie = btoa(encodeURIComponent(name)) + "=" + btoa(encodeURIComponent(value));
        for (const attributeKey in attributes) {
            updatedCookie += "; " + attributeKey;
            const attributeValue = attributes[attributeKey];
            if (attributeValue !== true) {
                updatedCookie += "=" + attributeValue;
            }
        }
        document.cookie = updatedCookie;
    }

    static dateAddMinute(min: number){
        return new Date(new Date().setMinutes(new Date().getMinutes() + min)).toUTCString();
    }

    static deleteCookie(name: string) {
        Cookie.setCookie(name, "", {
            'max-age' : -1
        })
    }

    static updateExpireCookie(name: string, min: number){
        Cookie.setCookie(name, Cookie.getCookie(name), {path: '/', expires: Cookie.dateAddMinute(min), maxAge: 1});
    }
}

export default Cookie;