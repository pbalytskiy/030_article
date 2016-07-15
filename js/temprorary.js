var article = '\
    <article class="article" id="<%= ...%>">\
        <header>\
             <span>Создано:</span>\
             <time datetime="2016-04-10"></time>\
             <div class="article-controls">\
                <span class="glyphicon glyphicon-remove" aria-hidden="true" onclick="<%= ...%>"></span>\
                <span class="glyphicon glyphicon-pencil" aria-hidden="true" onclick="<%= ...%> data-toggle="modal" data-target="#modal"></span>\
             </div>\
        </header>\
        <main>\
            <h2><%= ...%></h2>\
            <p><%= ...%></p>\
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

