
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IArticle } from '../components/Article';

function Details() {
  var { id } = useParams<{ id: string }>();
  var [article, setArticle] = useState ({} as IArticle);
  var [firstPart, setFirstPart] = useState('' as string);
  var [secondPart, setSecondPart] = useState('' as string);
  var [prevArticleId, setPrevArticleId] = useState<number | undefined>(0);
  var [nextArticleId, setNextArticleId] = useState<number | undefined>(0);

  var getDataFromServer = (id: string) => {
    var getArticle = fetch(`http://localhost:4000/articles/${id}`);
    var getArticles = fetch(`http://localhost:4000/articles/`);

    Promise.all([getArticle, getArticles]).then(results => Promise.all(results.map(r => r.json()))).then(response => {
      var article: IArticle = response[0];
      var articles: IArticle[] = response[1];
      setArticle(article);
      setFirstPart(article.content.split(".").filter(((word, i, words) => i <= words.length / 2)). join(".") + '.');
      setSecondPart(article.content.split(".").filter(((word, i, words) => i > words.length / 2)). join(".") + '.');
      var idNumber = parseInt(id)
      var articleIndex = articles.findIndex((a) => a.id === idNumber)
      if(articleIndex <= 0) {
        setPrevArticleId(0);
        setNextArticleId(articles[1].id);
      } else {
        setPrevArticleId(articles[articleIndex - 1].id);
        if(articleIndex < articles.length)
          setNextArticleId(articles[articleIndex + 1].id);
        else
          setNextArticleId(articles[articleIndex].id);
      }
    })
  }

  useEffect(() => getDataFromServer(id), [id]);


  return (
    <div>
      <article>
        <h2 className='title title--details'>{article.title}</h2>
        <ul className="info__container info__container--details">
          <li className="info__item">{article.tag}</li>
          <li className="info__item">Added by&nbsp;
            <span className="info__mark">{article.author}</span>
          </li>
          <li className="info__item">{article.date}</li>
        </ul>

        <img src={`${article.imgUrl}`} alt="Bike" />
        <div className="content__container">
          <p>{firstPart}</p>
          <p className="saying">Life is like riding a bicycle, to keep your balance you must keep moving</p>
          <p>{secondPart}</p>
          <footer className="footer">
        {prevArticleId !== 0 && <Link to={`/details/${prevArticleId}`}>
          <button className="footer__link">previous article</button>
        </Link>}
        {nextArticleId && <Link className="footer__link--next" to={`/details/${nextArticleId}`}>
          <button className="footer__link">next article</button>
        </Link>}
      </footer>
        </div>
        
      </article>
    </div>
  );
}

export default Details;
