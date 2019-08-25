export function mapFlagToAreaName(areaName) {
    if(['world', 'europe'].includes(areaName.toLowerCase())){return 'eu'}
    else if(areaName.toLowerCase() === 'england'){return 'uk'}
    else if(areaName.toLowerCase() === 'côte d’ivoire'){return 'ci'}
    else if(areaName.toLowerCase() === 'bosnia and herzegovina'){return 'bosnia'}
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