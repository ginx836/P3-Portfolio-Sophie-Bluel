const pathAPI = "http://localhost:5678/api";

export async function getWorks() {
  const works = await fetch(pathAPI + "/works");
  return await works.json();
}

export async function getCategories() {
  const category = await fetch(pathAPI + "/categories");
  return await category.json();
}
export async function loginUser(email, password) {
  const data = { email, password };

  const response = await fetch(pathAPI + "/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 200) {
    return await response.json();
  } else {
    return {};
  }
}

export async function sendForm(formData) {
  try {
    const response = await fetch(pathAPI + "/works", {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      method: "POST",
      body: formData,
    });

    if (response.status === 201) {
      return await response.json();
    } else {
      throw new Error(
        `Quelque chose s'est mal passé" (code d'erreur: ${response.status})`
      );
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      windows.location.href = "/login.html";
    } else {
      alert("Quelque chose s'est mal passé");
      console.error(error.message);
    }
    return {};
  }
}

export async function deleteWork(id) {
  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  if (response.status === 204) {
    return {};
  } else {
    throw new Error(response.statusText);
  }
}
