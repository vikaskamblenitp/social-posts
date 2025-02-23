class Posts {
  async addPost(body) {
    return new Promise((resolve, reject) => {
      resolve(body);
    })
  }
}

export const posts = new Posts();