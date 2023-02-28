var login = new Vue({
    el: '#login',
    data: {
        show_login: true,
        show_signup: false,
        users: [{
            user_id: '',
            user_password: '',
            user_email: '',
            user_fname: '',
            user_lname: '',
        }],
    }
})