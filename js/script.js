var articlesInRow = 2;
var editMode = false;

function setArticlesInRow(count) {
	articlesInRow = count;
	renderArticles();
}

var articles = JSON.parse(localStorage.getItem(ARTICLES_KEY));

function createArticle() {
	var title = document.getElementById('articleTitle').value;
	var content = document.getElementById('articleContent').value;
	var article = {
		title: title,
		content: content,
		creationDate: '2016-04-10',
		author: 'Pavel Balytskiy'
	};
	saveArticle(article);
	renderArticle(article);
	clearModalFields();
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
	var colHtml = document.createElement('div');
	colHtml.className = 'col-md-' + (12 / articlesInRow);
	colHtml.innerHTML = renderTemplate('articleTemplate', article);
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
	editMode = false;
}

function updateArticle() {
	var id = document.getElementById('articleId').value;
	articles[id].title = document.getElementById('articleTitle').value;
	articles[id].content = document.getElementById('articleContent').value;
	localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
	var refArticle = document.getElementById('art-' + id);
	var newArticle = renderTemplate('articleTemplate', articles[id]);
	refArticle.parentNode.replaceChild(newArticle, refArticle);
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
	normalizeLocalStorage(SEQUENCE_KEY, 'number', 1);
	normalizeLocalStorage(ARTICLES_KEY, 'object', {});
}