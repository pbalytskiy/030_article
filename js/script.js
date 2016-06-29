var spanHeaderText = 'Создано:';
var tdFooterAuthorText = 'Автор';
var buttonFooterText = 'View details >>';
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
	renderArticles(articles, article);
}

function createHtmlArticleElement(article) {
	var articleHtml = document.createElement('article');
	articleHtml.className = 'article';
		var articleHeaderHtml = document.createElement('header')
			var spanHeaderHtml = document.createElement('span');
			spanHeaderHtml.innerHTML = spanHeaderText;
			articleHeaderHtml.appendChild(spanHeaderHtml);
			var timeArticleHtml = document.createElement('time');
			timeArticleHtml.innerHTML = article.creationDate;
			articleHeaderHtml.appendChild(timeArticleHtml);
			var aRemoveButtonHtml = document.createElement('a');
			var spanRemoveButtonHtml = document.createElement('span');
			spanRemoveButtonHtml.className = 'glyphicon glyphicon-remove';
			spanRemoveButtonHtml.setAttribute('aria-hidden', 'true');
			aRemoveButtonHtml.appendChild(spanRemoveButtonHtml);
			articleHeaderHtml.appendChild(aRemoveButtonHtml);
			var aPencilButtonHtml = document.createElement('a');
			var spanPencilButtonHtml = document.createElement('span');
			spanPencilButtonHtml.className = 'glyphicon glyphicon-pencil';
			spanPencilButtonHtml.setAttribute('aria-hidden', 'true');
			aPencilButtonHtml.appendChild(spanPencilButtonHtml);
			articleHeaderHtml.appendChild(aPencilButtonHtml);
			articleHtml.appendChild(articleHeaderHtml); //what is dif between 50 line and 30?
		var mainHtml = document.createElement('main');
			var titleHtml = document.createElement('h2');
			titleHtml.innerHTML = article.title;
			mainHtml.appendChild(titleHtml);
			var contentHtml = document.createElement('p');
			contentHtml.innerHTML = article.content;
			mainHtml.appendChild(contentHtml);
			articleHtml.appendChild(mainHtml);
		var footerHtml = document.createElement('footer');
			var tableHtml = document.createElement('table');
			tableHtml.className = 'article-footer';
			var trUpHtml = document.createElement('tr');
			var tdAuthorHtml = document.createElement('td');
			tdAuthorHtml.innerHTML = tdFooterAuthorText;
			var spanAuthorHtml = document.createElement('span');
			spanAuthorHtml.className = 'glyphicon glyphicon-user';
			spanAuthorHtml.setAttribute('aria-hidden', 'true');
			tdAuthorHtml.appendChild(spanAuthorHtml);
			trUpHtml.appendChild(tdAuthorHtml);
			var tdButtonHtml = document.createElement('td');
			tdButtonHtml.setAttribute('rowspan', '2');
			var buttonHtml = document.createElement('button');
			buttonHtml.className = 'btn btn-default';
			buttonHtml.setAttribute('type', 'button');
			buttonHtml.innerHTML = buttonFooterText;
			tdButtonHtml.appendChild(buttonHtml);
			trUpHtml.appendChild(tdButtonHtml);
			tableHtml.appendChild(trUpHtml);
			var trSignure = document.createElement('tr');
			var	tdSignure = document.createElement('td');
			tdSignure.innerHTML = article.author;
			trSignure.appendChild(tdSignure);
			tableHtml.appendChild(trSignure);
			footerHtml.appendChild(tableHtml);
			articleHtml.appendChild(footerHtml);
	return articleHtml;
}

function renderArticles(articles, article) {
	var articleContainer = document.getElementById('articleContainer');
	articleContainer.innerHTML = '';
	// articles.forEach(function (article) {
	// 	var articleHtml = createHtmlArticleElement(article);
	// });
	for (i = 0; i < articles.length; i++) {
		var rowHtml = document.createElement('div');
		rowHtml.className = 'row';
		for (j = 0; j < 2; j++) {
			var colMd6Html = document.createElement('div');
			colMd6Html.className = 'col-md-6 example';
			var articleHtml = createHtmlArticleElement(article);
			articleHtml.appendChild(colMd6Html);
			rowHtml.appendChild(colMd6Html);
		}
		articleContainer.appendChild(rowHtml);
	}
}