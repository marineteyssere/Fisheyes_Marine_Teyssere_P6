function photographerFactory(data) {
    const { name, portrait, country, city, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt");
        const nom = document.createElement( 'h2' );
        nom.textContent = name;
        const pays = document.createElement( 'h3' );
        pays.textContent = country+"  "+ city;
        const citation = document.createElement( 'h4' );
        citation.textContent = tagline;
        const prix = document.createElement( 'h5' );
        prix.textContent = price+"€/jour";
        article.appendChild(img);
        article.appendChild(nom);
        article.appendChild(pays);
        article.appendChild(citation);
        article.appendChild(prix);
        return (article);
    }
    return { name, picture, country, city, tagline, price, getUserCardDOM }
}

// je dois rajouter city et tagline