async function getAnimes(searchAnime) {
    const res = await fetch(`https://api.jikan.moe/v3/search/anime?q=${searchAnime}`)
        .then(function (response) {
            if (response.status >= 404) {
                console.log("Bad response from server");
                return [];
            }
            return response.json();
        })
        .then(function (stories) {
            if(stories.lenght!=0) return stories.results;
            else return [];
        });
    return await res;
};
export default getAnimes;