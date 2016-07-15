var SEQUENCE_KEY = 'article_sequence';
var ARTICLES_KEY = 'articles';

var articlesInRow = 2;
var articleIdPrefix = 'art-';
var editMode = false;
var user;

function setArticlesInRow(count) {
	articlesInRow = count;
	renderArticles();
}

function normalizeLocalStorageValue(key, type, defaultValue) {
	var item = JSON.parse(localStorage.getItem(key));
	if (!item || typeof item !== type) {
		localStorage.setItem(key, JSON.stringify(defaultValue));
	}
}
normalizeLocalStorageValue(SEQUENCE_KEY, 'number', 1);
normalizeLocalStorageValue(ARTICLES_KEY, 'object', {});
//... !!!! normalizeLocalStorageValue * 2


var articles = JSON.parse(localStorage.getItem(ARTICLES_KEY));

renderArticles();
function createSaveAndShowArticle() {
	var title = document.getElementById('articleTitle').value;
	var content = document.getElementById('articleContent').value;
	var article = {
		title: title,
		content: content,
		creationDate: '2016-04-10',
		author: 'Pavel Balytskiy'
	};
	saveArticle(article);
	renderArticles();
	clearModalFields();
}

function createHtmlArticleElement(article) {
	// var creationDateLabel = 'Создано: ';
	// var authorLabel = 'Автор: ';
	// var viewDetailsBtnText = 'View details >>';

	var articleTmpl = '\
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
	var compiledArticle = _.template(articleTmpl);

	var data = {
		id: article.id,
		title: article.title,
		content: article.content,
		prefix: articleIdPrefix
	};

	var articleHtml = compiledArticle(data);
	console.log(articleHtml);
	return articleHtml;

}

function saveArticle(article) {
	function getNextId() {
		var id = localStorage.getItem(SEQUENCE_KEY);
		localStorage.setItem(SEQUENCE_KEY, ++id);
		return id;
	}
	article.id = getNextId();
	articles[article.id] = article;
	localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
}

function createElement(tagName) {
	return document.createElement(tagName);
}

function getRow() {
	var articleContainer = document.getElementById('articleContainer');
	var row = articleContainer.lastElementChild;
	var newRowNeeded = false;
	if (row) {
		newRowNeeded = row.childElementCount >= articlesInRow; //Возвращает количство дочерних элементов
	} else {
		newRowNeeded = true;
	}
	if (newRowNeeded) {
		row = document.createElement('div');
		row.className = 'row';
		articleContainer.appendChild(row);
	}
	return row;
}

function clearArticles() {
	var articleContainer = document.getElementById('articleContainer');
	articleContainer.innerHTML = '';
}

function renderArticle(article) {
	var articleHtml = createHtmlArticleElement(article);
	var colHtml = document.createElement('div');
	colHtml.className = 'col-md-' + (12 / articlesInRow);
	colHtml.appendChild(articleHtml);
	var row = getRow();
	row.appendChild(colHtml);
}

function renderArticles() {
	clearArticles();
	for (var id in articles) {
		if (!articles.hasOwnProperty(id)) continue;
		renderArticle(articles[id]);
	}
}

function clearModalFields() {
	document.getElementById('articleTitle').value = '';
	document.getElementById('articleContent').value = '';
	document.getElementById('articleId').value = '';
}

function updateArticle() {
	var id = document.getElementById('articleId').value;
	articles[id].title = document.getElementById('articleTitle').value;
	articles[id].content = document.getElementById('articleContent').value;
	localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
	var refArticle = document.getElementById(articleIdPrefix + id);
	var newArticle = createHtmlArticleElement(articles[id]);
	refArticle.parentNode.replaceChild(newArticle, refArticle);
	editMode = false;
	clearModalFields();
}

function editArticle(id) {
	editMode = true;
	document.getElementById('articleId').value = id;
	document.getElementById('articleTitle').value = articles[id].title;
	document.getElementById('articleContent').value = articles[id].content;
}

function deleteArticle(id) {
	articles = JSON.parse(localStorage.getItem(ARTICLES_KEY));
	delete articles[id];
	localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
	renderArticles();
}

function clearArticlesStorage() {
	localStorage.clear();
	articles = {};
	renderArticles();
	normalizeLocalStorageValue(SEQUENCE_KEY, 'number', 1);
	normalizeLocalStorageValue(ARTICLES_KEY, 'object', {});
}