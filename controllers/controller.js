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
                include: [{
                    model: User,
                    as: 'User',
                    attributes: ['username']
                }],
                order: [['createdAt', 'DESC']]
            });


            // res.render('users/home', {
            //     posts,
            //     user: 'Guest' //! sementara
            //     // user: req.session.username // bisa dipakai untuk ucapan 'Hi, {username}'
            // });
            res.render('users/home', {
                posts,
                user: "Guest",
                userId: 1
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
    static async getProfile(req, res) {
        try {
            const userId = req.params.id;

            const userData = await User.findByPk(userId, {
            include: Profile
            });

            if (!userData || !userData.Profile) {
            return res.status(404).send('User or Profile not found');
            }

            res.render('profiles/show', {
            user: userData,
            userId: userData.id
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getEditProfile(req, res) {
        try {
            const profileId = req.params.id;
            const profile = await Profile.findByPk(profileId, { include: User });

            res.render('profiles/edit', {
            profileId,
            profile,
                bio: profile.bio,
                photoProfile: profile.photoProfile,
                user: profile.User.username,
                userId: profile.User.id
            });
        } catch (error) {
                console.log(error);
                res.send(error);
        }
    }


    static async postEditProfile(req, res) {
        try {
            const profileId = req.params.id;
            const { bio, photoProfile } = req.body;

            // Update data ke database
            await Profile.update(
            { bio, photoProfile },
            { where: { id: profileId } }
            );

            const profile = await Profile.findByPk(profileId);
            res.redirect(`/profiles/${profile.UserId}`);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async deleteProfile(req, res) {
        try {
            const id = req.params.id;
            await Profile.destroy({ where: { id } });
            res.redirect(`/profiles/${id}`)
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

  // ========== POSTS ==========
    static async getCreatePost(req, res) {
        try {
            res.render('posts/create')
        } catch (err) {
            res.send(err)
        }
    }

  static async postCreatePost(req, res) {
        try {
            const { title, content } = req.body
            await Post.create({ title, content, UserId: req.session.userId })
            res.redirect('/home')
        } catch (error) {
            res.send(error)
        }
  }

     static async getEditPost(req, res) {
        try {
        const id = req.params.id
        const post = await Post.findByPk(id)

        res.render('posts/edit', { post })
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditPost(req, res) {
        try {
            const id = req.params.id
            const { title, content } = req.body
            await Post.update(
                { title, content },
                { where: { id } }
            )
            res.redirect('/home')
        } catch (error) {
            res.send(error)
        }
    }

    static async deletePost(req, res) {
        try {
            const id = req.params.id
            await Post.destroy({ where: { id } })
            res.redirect('/home')
        } catch (error) {
            res.send(error)
        }
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
