// SOURCE захардкожен, вноси сам

const cards = $('.card-wrapper');
const result = [];
for (card of cards) {
    const nameRu = $(card).find('.card-title').find('a').text().split('[')[0].trim();
    const nameEng = $(card).find('.card-title').find('a').text().split('[')[1].trim().slice(0, -1);
    const level = $(card).find('.size-type-alignment').text().split(',')[0][0];
    const school = $(card).find('.size-type-alignment').text().split(',')[1].trim();
    const castTime = $(card).find('li:contains("Время накладывания:")').text().split('Время накладывания:')[1].trim();
    const distantion = $(card).find('li:contains("Дистанция:")').text().split('Дистанция:')[1].trim();
    const components = $(card).find('li:contains("Компоненты:")').text().split('Компоненты:')[1].trim();
    const duration = $(card).find('li:contains("Длительность:")').text().split('Длительность:')[1].trim();
    const classes = $(card).find('li:contains("Классы:")').text().split('Классы:')[1].trim();
    $(card).find('[itemprop="description"] .additionalInfo').remove();
    $('.desc a').contents().unwrap();
    const description = $(card).find('[itemprop="description"]').html();

    const spell = {
        id: guidGenerator(),
        nameRu,
        nameEng,
        level: level === 'З' ? 0 : parseInt(level),
        school: school.charAt(0).toUpperCase() + school.slice(1),
        castTime,
        distantion,
        components,
        duration,
        classes: classes.split(', ').map(item => item.charAt(0).toUpperCase() + item.slice(1)),
        source: 'Explorer’s Guide to Wildemount',
        description: description.replace(/\n|\r/g, "")

    };
    result.push(spell);
}
let json = JSON.stringify(result);
console.log(json);

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
