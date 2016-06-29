
var articles = [];

function saveArticle() {
	var title = document.getElementById('articleTitle').value;
	var content = document.getElementById('articleContent').value;
	var article = {
		id: 0,
		title: title,
		content: content,
		creationDate: '2016-04-10',
		author: 'Pavel Balytskiy'
	};
	articles.push(article);
	renderArticles();
}

function createHtmlArticleElement(article) {
	var articleHtml = document.createElement('article');
	// Создать ХТМЛ
	return articleHtml;
}

function renderArticles() {
	var articleContainer = document.getElementById('articleContainer');
	articleContainer.innerHTML = '';
	articles.forEach(function(article) {
		var articleHtml = createHtmlArticleElement(article);
		var rowHtlm = ;
		for () {
			var colHtml = 
			colHtml.appendChild(articleHtml);;
			rowHtml.appendChild(colHtml);
		}
	});
}
