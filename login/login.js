var login = new Vue({
    el: '#login',
    data: {
        show_signIn: true,
        user_email: '',
        user_password: '',
        new_email: '',
        new_password1: '',
        new_password2: '',
        // users: [{
            // user_id: '',
            // user_password: '',
            // user_email: '',
            // user_fname: '',
            // user_lname: '',
        // }],
        users: [],
    },
    created() {
        if (localStorage.getItem("usersData") != null) {
            this.users = JSON.parse(localStorage.getItem("usersData"));  
        }
    },
    methods: {
        addUser() {
            if (this.new_email == '' || this.new_password1 == '' || this.new_password2 == '') {
                alert('Please complete the form below')
            }
            else if (this.new_password1 != this.new_password2) {
                alert('Incorrect password confirmation')
            }
            else if (this.new_email.includes('@') && this.new_email.includes('.')) {
                this.users.push({
                    user_email: this.new_email,
                    user_password: this.new_password1
                })
                alert('Sign up successfully')
                const myJSON = JSON.stringify(this.users);
                localStorage.setItem("usersData", myJSON);
                location.reload();
            }
        },
        checkUser() {
            let check = this.users.filter((data) => {
                return (data.user_email == this.user_email && data.user_password == this.user_password)
            })
            console.log(check)
            if(check.length > 0) {
                if (check[0].user_email == this.user_email && check[0].user_password == this.user_password) {
                    alert('Sign in sucessfully')
                    window.location.href = "../index.html";
                }
                else {
                    alert('Incorrect email or password')
                }
            }
            else {
                alert('Incorrect email or password')
            }
        },
    }
})