const element = document.getElementsByTagName("span");
const content = " ok :*, wwwwwwwwwwwaaaaaaaaaaaaaaaaaaaaat, ahah rien mais je pense que ton natle était connecté a 3h du mat, j'ai du faire semeblant d'être bien trop bouré pour que sinzi vienne pas dormir chez moi, ehh, Appelle moi ça ira mieux, Ça va ça va :p, adieu ça va ?, ahah ouai on verra, mais ç a planter et ça ma saouler de réecrire, oulla les reste de hier soir";

window.onload = () => {
  for (let i = 0; element.length >= i; i++) {
    let paragraph = element[i];
    paragraph.innerHTML = '<p>' + content + '</p>';
  }
};
