const overview = document.querySelector(".overview"); //div where my profile information will appear
const username = "Miriam-C-B"; // GitHub user name
const repoList = document.querySelector(".repo-list"); // unordered repo list


//async function that fetches information from my GitHub profile
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);

    const data = await userInfo.json();
    console.log(data);

displayUserInfo(data); //calls async function that displays specific user information
};

gitUserInfo();

// async function that fetches the specific user information from profile 
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> `;

    overview.append(div);
    gitRepos();
};

// function to fetch repos
const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    //console.log(repoData);
    displayRepos(repoData)
};

//function to display info about each repo
const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};






