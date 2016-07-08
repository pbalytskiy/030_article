var SEQUENCE_KEY = 'article_sequence';
var ARTICLES_KEY = 'articles';
var articlesInRow = 2;


function normalizeLocalStorageValue(key, type, defaultValue) {
	var item = JSON.parse(localStorage.getItem(key));
	if (typeof item !== type) {
		localStorage.setItem(key, JSON.stringify(defaultValue));
	}
}
normalizeLocalStorageValue(SEQUENCE_KEY, 'number', 1);
normalizeLocalStorageValue(ARTICLES_KEY, 'object', {});

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
	var creationDateLabel = 'Создано: ';
	var authorLabel = 'Автор: ';
	var viewDetailsBtnText = 'View details >>';

	var articleHtml = createElement('article');
	articleHtml.className = 'article';
	articleHtml.appendChild(getHeader());
	articleHtml.appendChild(getMain());
	articleHtml.appendChild(getFooter());

	function getHeader() {
		var removeSpan = createElement('span');
		removeSpan.setAttribute('aria-hidden', 'true');
		removeSpan.className = 'glyphicon glyphicon-remove';

		var pencilSpan = createElement('span');
		pencilSpan.setAttribute('aria-hidden', 'true');
		pencilSpan.className = 'glyphicon glyphicon-pencil';

		var articleControls = createElement('div');
		articleControls.className = 'article-controls';
		articleControls.appendChild(createElement('a').appendChild(removeSpan));
		articleControls.appendChild(createElement('a').appendChild(pencilSpan));

		var creationLabel = createElement('span');
		creationLabel.innerHTML = creationDateLabel;

		var time = createElement('time');
		time.innerHTML = article.creationDate;

		var header = createElement('header');
		header.appendChild(creationLabel);
		header.appendChild(time);
		header.appendChild(articleControls);
		return header;
	}

	function getMain() {
		var h2 = createElement('h2');
		h2.innerHTML = article.title;

		var p = createElement('p');
		p.innerHTML = article.content;

		var main = createElement('main');
		main.appendChild(h2);
		main.appendChild(p);
		return main;
	}

	function getFooter() {
		var authorSpan = createElement('span');
		authorSpan.className = 'glyphicon glyphicon-user';
		authorSpan.setAttribute('aria-hidden', 'true');

		var tdAuthorHtml = createElement('td');
		tdAuthorHtml.innerHTML = authorLabel;
		tdAuthorHtml.appendChild(authorSpan);

		var buttonHtml = createElement('button');
		buttonHtml.className = 'btn btn-default';
		buttonHtml.setAttribute('type', 'button');
		buttonHtml.innerHTML = viewDetailsBtnText;

		var tdButtonHtml = createElement('td');
		tdButtonHtml.setAttribute('rowspan', '2');
		tdButtonHtml.appendChild(buttonHtml);

		var trUp = createElement('tr');
		trUp.appendChild(tdAuthorHtml);
		trUp.appendChild(tdButtonHtml);

		var	tdSignature = createElement('td');
		tdSignature.innerHTML = article.author;

		var trSignature = createElement('tr');
		trSignature.appendChild(tdSignature);

		var table = createElement('table');
		table.className = 'article-footer';
		table.appendChild(trUp);
		table.appendChild(trSignature);

		var footer = createElement('footer');
		footer.appendChild(table);
		return footer;
	}

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

function renderArticle(article) {
	var articleHtml = createHtmlArticleElement(article);
	var colHtml = document.createElement('div');
	colHtml.className = 'col-md-' + (12 / articlesInRow);
	colHtml.appendChild(articleHtml);
	var row = getRow();
	row.appendChild(colHtml);
}

function renderArticles() {
	var articleContainer = document.getElementById('articleContainer');
	articleContainer.innerHTML = '';
	for (var id in articles) {
		if (!articles.hasOwnProperty(id)) continue;
		renderArticle(articles[id]);
	}
}

function clearModalFields() {
	document.getElementById('articleTitle').value = '';
	document.getElementById('articleContent').value = '';
}
