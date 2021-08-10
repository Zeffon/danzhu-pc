// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = "https://www.zeffon.cn/danzhu/v1";
const localStorageKey = "__auth_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleSaveToken = (token: string) => {
  window.localStorage.setItem(localStorageKey, token || "");
  return token;
};

export const login = (data: { password: string }) => {
  return fetch(`${apiUrl}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      const res = await response.json();
      return handleSaveToken(res.token);
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
