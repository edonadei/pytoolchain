import axios from "axios";

export const baseURL = `https://api.github.com/graphql`;

const pythonFirst = (a, fn) => {
  var non_matches = [];
  var matches = a.filter(function(e, i, a) {
    var match = fn(e, i, a);
    if (!match) non_matches.push(e);
    return match;
  });
  return matches.concat(non_matches);
};

export const getRepositoriesFromUser = async userId => {
  const githubSecret = process.env.REACT_APP_GITHUBACCESSTOKEN;
  const results = await axios({
    url: `${baseURL}`,
    method: "POST",
    headers: {
      authorization: `token ${githubSecret}`
    },
    data: {
      query: `{
                repositoryOwner(login: "${userId}"){
                    repositories(last:30){
                    nodes{
                        name
                        url
                        primaryLanguage {
                          name
                        }
                    }
                    }
                }
                }
                `
    }
  }).then(({ data }) => data); // We keep it for debug
  let resultsUnfiltered = results?.data?.repositoryOwner?.repositories.nodes;
  if (resultsUnfiltered != null && resultsUnfiltered.constructor === Array) {
    let resultsUnfilteredSorted = resultsUnfiltered.sort((a, b) =>
      a.primaryLanguage?.name.localeCompare(b.primaryLanguage?.name)
    );
    return pythonFirst(
      resultsUnfilteredSorted,
      result => result?.primaryLanguage?.name === "Python"
    );
  } else {
    return [];
  }
};
