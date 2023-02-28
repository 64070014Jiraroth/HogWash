var login = new Vue({
    el: '#login',
    data: {
        show_signIn: true,
        // show_signUp: false,
        users: [{
            user_id: '',
            user_password: '',
            user_email: '',
            user_fname: '',
            user_lname: '',
        }],
    }
})