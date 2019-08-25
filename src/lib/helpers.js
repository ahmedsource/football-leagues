export function isLink(s){
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

export function get(obj, key) {
    return key.split(".").reduce(function (o, x) {
        return (typeof o == "undefined" || o === null) ? o : o[x];
    }, obj);
}


export function isNull(input) {
    return [null, "null", "NULL", "nil"].includes(input)
}

export function getLocalStore(key) {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
}

export function setLocalStore(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function mapFlagToAreaName(areaName) {
    if(['world', 'europe'].includes(areaName.toLowerCase())){return 'eu'}
    else if(areaName.toLowerCase() === 'england'){return 'uk'}
    else if(areaName.toLowerCase() == 'côte d’ivoire'){return 'ci'}
    else if(areaName.toLowerCase() == 'bosnia and herzegovina'){return 'bosnia'}
    else {return areaName.toLowerCase()}
                                    
}

export function mapPositionToColor(position){
    const colors = {
        'Goalkeeper':'yellow',
        'Defender':'blue',
        'Midfielder':'green',
        'Attacker':'red',
        'COACH':'grey',
        'ASSISTANT_COACH':'grey'
    }
    return colors[position]
}

export function formatDate(utcDate){
    const date = new Date(`${utcDate}`)
    return date.toString().split("GMT")[0].trim();
}