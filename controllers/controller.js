const { User, Profile, Post, Interaction } = require('../models')

class Controller {
    // ========== HOME ==========
    static home(req, res) {
    res.render('home');
    }

    // ========== USERS ==========
    static async getHome(req, res) {
        try {
            // Cek apakah user sudah login (dari session)
            // if (!req.session.userId) {
            //     return res.redirect('/login');
            // }

            // Ambil semua post dari database (misal kamu punya model Post)
            const posts = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            res.render('users/home', {
                posts
                // user: req.session.username // bisa dipakai untuk ucapan 'Hi, {username}'
            });
        } catch (error) {
            console.log(error);
            res.send(error)
            // res.status(500).send('Internal Server Error');
        }
    }

    static async getRegister(req, res) {
        try {
            res.render('users/register');
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            const { username, email, password } = req.body
            await User.create({ username, email, password })
            res.redirect('/users/login')
        } catch (error) {
            console.log(error);
            res.send(error)
        //   let errorMsg = 'Something went wrong';
        //   if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        //     errorMsg = error.errors.map(e => e.message).join(', ');
        //   }
        //   res.render('users/register', { error: errorMsg });
        }
    }

    static async getLogIn(req, res) {
        try {
            res.render('users/login', { error: null })
        } catch (error) {
            console.log(error);
            res.send(error)
            // res.status(500).send('Internal Server Error');
        }
    }

    static async postLogIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            // if (!user || user.password !== password) {
            //     throw new Error('Invalid email or password');
            // }
            res.redirect('/', { user });
        } catch (error) {
            console.log(error);
            res.send(error)
            // res.render('users/login', { error: error.message });
        }
    }

    static async logOut(req, res) {
        try {
            // Hapus session user
            req.session.destroy(
            //     (err) => {
            //     if (err) {
            //         console.log(err);
            //         return res.status(500).send('Failed to log out.');
            //     }
            //     // Arahkan ke halaman login setelah logout
            // };
            )
            res.redirect('/login');
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

  // ========== PROFILES ==========
  static createProfile(req, res) {
    if (req.method === 'GET') {
      res.render('profiles/create');
    } else {
      // TODO: Create logic
      res.redirect('/profiles');
    }
  }

  static getProfile(req, res) {
    const id = req.params.id;
    // TODO: Fetch profile
    res.render('profiles/show', { profileId: id });
  }

  static editProfile(req, res) {
    const id = req.params.id;
    if (req.method === 'GET') {
      // TODO: Fetch profile
      res.render('profiles/edit', { profileId: id });
    } else {
      // TODO: Update logic
      res.redirect(`/profiles/${id}`);
    }
  }

  static deleteProfile(req, res) {
    const id = req.params.id;
    // TODO: Delete profile logic
    res.redirect('/profiles');
  }

  // ========== POSTS ==========
  static createPost(req, res) {
    if (req.method === 'GET') {
      res.render('posts/create');
    } else {
      // TODO: Create post logic
      res.redirect('/posts');
    }
  }

  static editPost(req, res) {
    const id = req.params.id;
    if (req.method === 'GET') {
      // TODO: Fetch post
      res.render('posts/edit', { postId: id });
    } else {
      // TODO: Edit post logic
      res.redirect('/posts');
    }
  }

  static deletePost(req, res) {
    const id = req.params.id;
    // TODO: Delete post logic
    res.redirect('/posts');
  }

  // ========== INTERACTIONS ==========
  static upvotePost(req, res) {
    const postId = req.params.postId;
    // TODO: Upvote logic
    res.redirect(`/posts/${postId}`);
  }

  static downvotePost(req, res) {
    const postId = req.params.postId;
    // TODO: Downvote logic
    res.redirect(`/posts/${postId}`);
  }

  static commentPost(req, res) {
    const postId = req.params.postId;
    const { comment } = req.body;
    // TODO: Save comment
    res.render('interactions/comments', {
      postId,
      comment
    });
  }
}

module.exports = Controller;
