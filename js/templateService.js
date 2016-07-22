
function renderTemplate(template, data) {
    var htmlTemplate = document.getElementById(template).innerHTML;
    var compiledTemplate = _.template(htmlTemplate);
    return compiledTemplate(data);
}