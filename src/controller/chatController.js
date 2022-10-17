import chatDao from '../DAO/chatDao.js';

class chatController {
    async getMessages(req, res) {
        try {
          const user = req.session.user;
          if (!user) return res.redirect('login');
          res.render('chat', { user });
        } catch (error) {
          console.log(`Error al buscar los mensajes. ${error}`);
          return res.status(500).json({ error_description: 'Server error.' });
        }
      }
      async getUserMessages(req, res) {
        try {
          const user = req.session.user;
          if (!user) return res.redirect('/login');
          const messages = await chatDao.listAll();
          res.render('chat-administrador', { messages });
        } catch (error) {
          console.log(`Error al buscar los mensajes del usuario. ${error}`);
          return res.status(500).json({ error_description: 'Server error.' });
        }
      }
      async adminView(req, res) {
        try {
          const user = req.session.user;
          if (!user) return res.redirect('/login');
          const email = req.params.email;
          if (email != user.email) return res.redirect('/chat');
          const messages = await chatDao.listByEmail(email);
          res.render('chat-usuario', { messages });
        } catch (error) {
          console.log(`Error buscar los mensajes para el admin. ${error}`);
          return res.status(500).json({ error_description: 'Server error.' });
        }
      }
      async adminGetMessage(req, res) {
        try {
          const id = req.params.id;
          const message = await chatDao.listById(id);
          res.render('chat_respuesta_administrador', { message });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error_description: 'Server error.' });
        }
      }
      async adminRespondeMessage(req, res) {
        try {
          const id = req.params.id;
          const { response } = req.body;
          const message = await chatDao.listById(id);
          message.response = response;
          await chatDao.update(id, message);
          res.redirect('/chat/admin');
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error_description: 'Server error.' });
        }
      }
}

export default new chatController();