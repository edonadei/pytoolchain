import axios from "axios";

export const baseURL = `https://api.github.com/graphql`;

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
                    }
                    }
                }
                }
                `
    }
  }).then(({ data }) => data); // We keep it for debug
  return results.data.repositoryOwner.repositories.nodes;
};
