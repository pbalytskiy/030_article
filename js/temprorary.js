var article = '\
    <article class="article" id="<%= prefix %><%= id %>">\
        <header>\
             <span>Создано:</span>\
             <time datetime="2016-04-10"></time>\
             <div class="article-controls">\
                <span class="glyphicon glyphicon-remove" aria-hidden="true" onclick="<%= id %>"></span>\
                <span class="glyphicon glyphicon-pencil" aria-hidden="true" onclick="<%= id %> data-toggle="modal" data-target="#modal"></span>\
             </div>\
        </header>\
        <main>\
            <h2><%= title %></h2>\
            <p><%= content %></p>\
        </main>\
        <footer>\
            <table class="article-footer">\
                <tr>\
                    <td><span class="glyphicon glyphicon-user" aria-hidden="true"></span>Автор:</td>\
                    <td rowspan="2"><button class="btn btn-default" type="button">View details >></button></td>\
                </tr>\
                <tr>\
                    <td>Pavel Balytskiy</td>\
                </tr>\
            </table>\
        </footer>\
    </article>\
';

var compiledArticle = _.template(article);

var data = {
    id: article.id,
    title: article.title,
    content: article.content,
    prefix: articleIdPrefix
};


