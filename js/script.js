const overview = document.querySelector(".overview"); //div where my profile information will appear
const username = "Miriam-C-B"; // GitHub user name


//async function that fetches information from my GitHub profile
const getData = async function () {
    const result = await fetch(`https://api.github.com/users/${username}`);

    const data = await result.json();
    console.log(data);

displayUserInfo(data); //calls async function that displays specific user information
};

getData();

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
};
