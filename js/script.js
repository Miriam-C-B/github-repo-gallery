const overview = document.querySelector(".overview"); //div where my profile information will appear
const username = "Miriam-C-B"; // GitHub user name
const repoList = document.querySelector(".repo-list"); // unordered repo list
const allReposContainer = document.querySelector(".repos"); //section in which all the repo information appears
const repoData = document.querySelector(".repo-data"); //section where data from individual repos will appear
const viewReposButton = document.querySelector(".view-repos"); //selects back to repo gallery button
const filterInput = document.querySelector(".filter-repos") // selects input with "search by name" placeholder


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

//function to display repos
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

//Click event for the entire ul
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//function to get specific repo info and fetch languages
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    //grab the languages used in a repo
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    //make a list of languages
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    };
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

//function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub</a>
        <a class="visit-pages" href="https://${username}.github.io/${repoInfo.name}/" target="_blank" rel="noreferrer noopener">Try the Site</a>`;
    repoData.append(div);
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    viewReposButton.classList.remove("hide");
};

//event listener for backButton
viewReposButton.addEventListener("click", function (){
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});

// Input event for the search box
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    //console.log(search);
    const repos = document.querySelectorAll(".repo"); //selects ALL elements with the class .repo
    const searchLowerText = searchText.toLowerCase();

    //loop through each repo
    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase(); //changes repos innerText to lower case
        //check if repo text includes the lowercase search text
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide"); //shows repos that include the string of letters you're searching for
        } else {
            repo.classList.add("hide"); //hides repo that does not include the string of letters you're searching for
        }
    }

});



