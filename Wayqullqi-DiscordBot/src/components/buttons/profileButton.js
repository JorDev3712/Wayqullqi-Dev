const AuthController = require('../../controllers/authController');

module.exports = {
    customId: 'onProfileButtonClick',
    async execute(interaction) {
        const resultCode = await AuthController.checkUser(interaction);
    },
};