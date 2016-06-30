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
	var creationDateLabel = 'Создано:';
	var authorLabel = 'Автор';
	var viewDetailsBtnText = 'View details >>';
	var articleHtml = document.createElement('article');
	articleHtml.className = 'article';
	articleHeaderHtml();
	mainHtml();
	footerHtml();
	function articleHeaderHtml() {
		var articleHeaderHtml = document.createElement('header')
		var spanHeaderHtml = document.createElement('span');
		spanHeaderHtml.innerHTML = creationDateLabel;
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
		articleHtml.appendChild(articleHeaderHtml);
	}
	function mainHtml() {
		var mainHtml = document.createElement('main');
		var titleHtml = document.createElement('h2');
		titleHtml.innerHTML = article.title;
		mainHtml.appendChild(titleHtml);
		var contentHtml = document.createElement('p');
		contentHtml.innerHTML = article.content;
		mainHtml.appendChild(contentHtml);
		articleHtml.appendChild(mainHtml);
	}
	function footerHtml() {
		var footerHtml = document.createElement('footer');
		var tableHtml = document.createElement('table');
		tableHtml.className = 'article-footer';
		var trUpHtml = document.createElement('tr');
		var tdAuthorHtml = document.createElement('td');
		tdAuthorHtml.innerHTML = authorLabel;
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
		buttonHtml.innerHTML = viewDetailsBtnText;
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
	}
	console.log(articleHtml);
	return articleHtml;
}

function renderArticles() {
	var articleContainer = document.getElementById('articleContainer');
	articleContainer.innerHTML = '';
	var articlesInRow = 2;
	for (i = 0; i < articles.length; i += articlesInRow) {
		var rowHtml = document.createElement('div');
		rowHtml.className = 'row';
		for (j = i; j < i + articlesInRow; j++) {
			var colHtml = document.createElement('div');
			colHtml.className = 'col-md-6 article';
			var articleHtml = createHtmlArticleElement(articles[j]);
			colHtml.appendChild(articleHtml);
			rowHtml.appendChild(colHtml);
		}
		articleContainer.appendChild(rowHtml);
	}
}