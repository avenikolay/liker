// ♥ 
const rootEl = document.getElementById('root');
let nextId = 1

function action(actionType, post, event) {
    event.preventDefault();

    if (actionType === 'like') {
        if (post.isLikedByMe) {
            post.likes--;
            post.isLikedByMe = false;
        } else {
            post.likes++;
            post.isLikedByMe = true;

            if (post.isDislikedByMe) {
                post.dislikes--;
                post.isDislikedByMe = false;
            }
        }
    }
    if (actionType === 'dislike') {
        if (post.isDislikedByMe) {
            post.dislikes--;
            post.isDislikedByMe = false;
        } else {
            post.dislikes++;
            post.isDislikedByMe = true;

            if (post.isLikedByMe) {
                post.likes--;
                post.isLikedByMe = false;
            }
        }
    }

    renderActions(post);
}
function renderActions(post) {
    const DOMPost = document.getElementById('post'+post.id);
    const likeBtn = DOMPost.getElementsByClassName('post__likeBtn')[0];
    const dislikeBtn = DOMPost.getElementsByClassName('post__dislikeBtn')[0];

    post.isLikedByMe ? likeBtn.classList = 'post__likeBtn post__likeBtn--active' : likeBtn.classList ='post__likeBtn';

    post.isDislikedByMe ? dislikeBtn.classList = 'post__dislikeBtn post__dislikeBtn--active' : dislikeBtn.classList = 'post__dislikeBtn';

    likeBtn.textContent = `♥ ${post.likes}`;
    dislikeBtn.textContent = `✖ ${post.dislikes}`;
}

const posts = [
    {
        id: nextId++, 
        text: 'Чтобы не оказаться в заглохшей машине посреди дороги, заправляйтесь с картой «Насия» в рассрочку на 10 дней, без комиссии 😉',
        likes: 1,
        dislikes : 7,
        isLikedByMe: true,
        isDislikedByMe: false,
    },
    {
        id: nextId++, 
        text: `
        🤓 Исторические факты о банковских картах:
        
        — впервые идею о кредитных карточках предложил Эдуард Беллами в своей книге «Глядя назад» аж в 1880 году
        — первая банковская карта была выпущена маленьким нью-йоркским банком Long Island Bank в 1951 году
        — первый и единственный памятник пластиковой банковской карте был поставлен в Екатеринбурге в 2011 году`,
        likes: 10,
        dislikes : 7,
        isLikedByMe: true,
        isDislikedByMe: false,
    },
    {
        id: nextId++, 
        text: `В связи с проведением годового собрания, в эту субботу работаем до 13:00.

        При возникновении вопросов, пишите нам в онлайн-чатах. После собрания обязательно ответим. А для погашения рассрочки воспользуйтесь платёжными терминалами или alif mobi.
        
        Спасибо за понимание 💚`,
        likes: 9,
        dislikes : 7,
        isLikedByMe: false,
        isDislikedByMe: false,
    },
];


for (const post of posts) {

    const postEl = document.createElement('div');
    postEl.id = `post${post.id}`;
    postEl.dataset.postId = post.id;
    postEl.className = 'post';

        const postText = document.createElement('p');
        postText.className = 'post__text';
        postText.textContent = `${post.text}`;
        postEl.appendChild(postText);

        const postHr = document.createElement('hr');
        postHr.className = 'post__hr';
        postEl.appendChild(postHr);

        const  actionsEl = document.createElement('div');
        actionsEl.className = 'post__actions';
        postEl.appendChild(actionsEl);

            const likeEl = document.createElement('a');
            likeEl.className = 'post__likeBtn';
            if (post.isLikedByMe) {
                likeEl.classList.add('post__likeBtn--active');
            }
            likeEl.setAttribute('href', '#');
            likeEl.textContent = `♥ ${post.likes}`;
            likeEl.onclick = (event) => {
                action('like', post, event);
            }
            actionsEl.appendChild(likeEl, post);

            const dislikeEl = document.createElement('a');
            dislikeEl.className = 'post__dislikeBtn';
            if (post.isDislikedByMe) {
                dislikeEl.classList.add('post__dislikeBtn--active');
            }
            dislikeEl.setAttribute('href', '#');
            dislikeEl.textContent = `✖ ${post.dislikes}`;
            dislikeEl.onclick = (event) => {
                action('dislike', post, event);
            }
            actionsEl.appendChild(dislikeEl);

    rootEl.appendChild(postEl);
}