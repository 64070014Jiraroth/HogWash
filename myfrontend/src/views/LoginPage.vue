<template>
    <div id="login">
        <a class="backButton" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-arrow-bar-left"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
            </svg>
        </a>

        <table style="width:100%">
        <tr>
        <div class="row loginCard">
            <!-- LOG In -->
            <div id="login_card" class="col-sm-6">
                <!-- <div class="card card_login" v-show="show_login"> -->
                <td class="card card_login" >
                    <div class="card-body">
                        <h5 class="card-title title_login mx-3">ลงชื่อเข้าใช้</h5>
                        <a class="card-text">
                        <form action="/login/" enctype="multipart/form-data" method="POST">
                            <div class="form-group mx-3 py-4">
                                <input v-model="loginEmail" class="form-control" type="email" />
                                <!-- <input v-model="loginEmail" type="email" class="form-control" id="loginEmail"
                                    name="loginEmail" placeholder="อีเมล" required> -->
                            </div>
                            <div class="form-group mx-3 py-4">
                                <input v-model="loginPassword" class="form-control" type="password" />
                                <!-- <input v-model="loginPassword" type="password" class="form-control" id="loginPassword"
                                    name="loginPassword" placeholder="รหัสผ่าน" required> -->
                            </div>
                            <button class="btn py-2 mb-3" type="submit" style="background-color:#59A8B9;color:white;"
                                @click="submit()">
                                เข้าสู่ระบบ
                            </button>
                        </form>
                        </a>
                        <br><small class="text-muted py-4">ยังไม่มีบัญชีผู้ใช้ ?
                            <a @click="show_login = !show_login" style="color:#59A8B9; cursor: pointer;">สมัครเลย</a>
                        </small>
                    </div>
                </td>
                <!-- <div class="card card_login" v-show="show_login == false"> -->
                <td class="card card_login" >
                    <div class="card-body" style="background-color: #EEFCFF;border-radius: 30px;">
                        <img style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"
                            :src="require('../assets/img/logo.png')">
                    </div>
                </td>
            </div>

            <!-- Sign Up -->
            
        </div>
        </tr>
        </table>

    </div>
</template>

<script>
import axios from '@/plugins/axios'
import "../assets/css/login.css";

import {
    required,
    email,
    minLength,
    sameAs,
} from "vuelidate/lib/validators";

function complexPassword(value) {
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        return false;
    }
    return true;
}
export default {
    props: ['user'],
    data() {
        return {
            signUpEmail: "",
            signUpPassword: "",
            confirm_password: "",
            loginEmail: "",
            loginPassword: "",
        };
    },
    validations: {
        signUpEmail: {
            required,
            email,
        },
        signUpPassword: {
            required: required,
            minLength: minLength(6),
            complex: complexPassword,
        },
        confirm_password: {
            sameAs: sameAs("signUpPassword"),
        },
    },
    methods: {
        addUser() {
        // Validate all fields
        this.$v.$touch();

        // เช็คว่าในฟอร์มไม่มี error
        if (!this.$v.$invalid) {
            let data = {
                signUpEmail: this.signUpEmail,
                signUpPassword: this.signUpPassword,
                confirm_password: this.confirm_password,
            };

            axios
            .post("/user/signup", data)
            .then(() => {
                alert("Sign up Success");
            })
            .catch((err) => {
                alert(err.response.data.details.message)
            });
        }
        },
        submit () {
            const data = {
                loginEmail: this.loginEmail,
                loginPassword: this.loginPassword
            } 
            axios.post('/user/login/', data)
            .then(res => {
                const token = res.data.token                                
                localStorage.setItem('token', token) // เอา token ที่ได้ไปใส่ใน local storage
                this.$emit('auth-change')
                this.$router.push({path: '/'}) // login สำเร็จ -> ไปหน้า index
            })
            .catch(error => {
                this.error = error.response.data
                console.log(error.response.data)
            })
        }
    },
};
</script>
