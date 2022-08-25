// Page d'acceuil

function photographerFactory(data) {
    const { name, portrait, country, city, tagline, price, alt, id } = data;
    

    const picture = `assets/photographers/${portrait}`;

    const html = "photographer.html";
    const lien = `${html}?photographer=${id}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' ) ;

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", alt );
       // img.getAttribute("id", lien);
        img.onclick= function (){document.location=`${html}?photographer=${id}`}
        //img.querySelector("img").focus();
        

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
// 