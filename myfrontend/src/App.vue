<template>
  <div id="app">
    <!-- nav bar -->
    <nav
      class="navbar fixed-top navbar-expand-lg navbar-light justify-content-between" style="background-color:#CAEAF1;font-size:20px">
      <a class="navbar-brand mx-4" href="/">
        <img
          :src="require('./assets/img/logo.png')"
          width="80"
          height=""
          alt=""
        />
      </a>
      <a class="navbar-brand" href="../#home1" style="padding-top:10px;color: #59a8b9">HogWash</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!-- <li class="nav-item active">
                    <a class="nav-link" href="#">หน้าแรก</a>
                </li> -->
          <li class="nav-item">
            <a class="nav-link" href="../#home2">สถานะเครื่องซักผ้า</a>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">
              <a>ติดต่อเรา</a>
            </router-link>
          </li>

          <li class="nav-item" v-if="user && user.role == 'admin'">
            <router-link to="/feedback" class="nav-link">
              <a style="color:#59A8B9;">กล่องข้อความ</a>
            </router-link>
          </li>

          <!-- <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              data-toggle="modal"
              data-target="#gotQueue"
              data-dismiss="modal"
            >
              <b class="text-info"> ( ทดสอบได้คิว ) </b></a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              data-toggle="modal"
              data-target="#editQueue"
              data-dismiss="modal"
            >
              <b class="text-danger"> ( กดคิวซ้ำ ) </b></a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              data-toggle="modal"
              data-target="#inQueue"
              data-dismiss="modal"
            >
              <b class="text-danger"> ( inQueue ) </b></a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              data-toggle="modal"
              data-target="#completed"
              data-dismiss="modal"
            >
              <b class="text-danger"> ( completed ) </b></a
            >
          </li> -->
        </ul>
      </div>

      <!-- to-login-page button -->
      <a  class="px-3 mx-3" href="/user">
        <button 
          v-if="!user"
          class="btn my-2 my-sm-0"
          type="submit"
          style="
            background-color: #59a8b9;
            color: white;
            font-size: 18;
            width: 120px;
          ">
          <router-link style="text-decoration: none; color: inherit;padding-right:0;" to="/user">
          เข้าสู่ระบบ
          </router-link>
        </button>
      </a>

      <!-- greeting button -->
      <b-dropdown  v-if="user" id="dropdown-right" :text="'ยินดีต้อนรับ ' + user.email + ' ! '" variant="none" style="margin:20px;">
        <b-dropdown-item v-b-modal="'changePassword'">
            แก้ไขรหัสผ่าน 
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link style="text-decoration: none; color: inherit;padding-right:0;" to="/history">
            ประวัติการใช้งาน
          </router-link>
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click="logOut()">ออกจากระบบ</b-dropdown-item>
      </b-dropdown>

        <!-- modal change password -->

        <b-modal id="changePassword" size='lg' centered hide-footer hide-header no-stacking>
          <template>
            <h1 class="modal-title my-4 w-100 text-center">
              แก้ไขรหัสผ่าน
            </h1>
              <form>
                <div class="row justify-content-center">
                  <div class="col-auto">
                    <table class="table no-border">
                      <tr style="border:none">
                        <td style="font-size:20px;font-weight: 300;text-align: right;border:none;">รหัสผ่านปัจจุบัน</td>
                        <td style="border:none;">
                          <input
                            v-model="currentPassword"
                            type="password"
                            class="form-control"
                            placeholder="รหัสผ่านปัจจุบัน"
                          />
                        </td>
                      </tr>
                      <tr style="border:none">
                        <td style="font-size:20px;font-weight: 300;text-align: right;border:none;">รหัสผ่านใหม่</td>
                        <td style="border:none;">
                          <input
                            v-model="newPassword"
                            type="password"
                            class="form-control"
                            placeholder="รหัสผ่านใหม่"
                          />
                        </td>
                      </tr>
                      <tr style="border:none">
                        <td style="font-size:20px;font-weight: 300;text-align: right;border:none;">ยืนยันรหัสผ่านใหม่</td>
                        <td style="border:none;">
                          <input
                            v-model="confirm_newPassword"
                            type="password"
                            class="form-control"
                            placeholder="ยืนยันรหัสผ่านใหม่"
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <b-button
                  class="button-changePass btn py-2 mb-3"
                  type="submit"
                  style="background-color: #59a8b9; color: white"
                  @click="submitPassword()"
                >
                  บันทึก</b-button
                ><br />
              </form>
          </template>
        </b-modal>
    </nav>

    <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user"/>
  </div>
</template>

<script>
import axios from '@/plugins/axios'

export default {
  data () {
    return {
      user: null,
      currentPassword: "",
      newPassword: "",
      confirm_newPassword: "",
    }
  },
  mounted () {
    this.onAuthChange()
  },
  methods: {
    onAuthChange () {
      const token = localStorage.getItem('token')
      if (token) {
        this.getUser()
      }
    },
    getUser () {
      // const token = localStorage.getItem('token')
      // axios.get('http://localhost:3000/user/me', { headers: {Authorization: 'Bearer ' + token} }).then(res => {
      axios.get('/user/me').then(res => {
        this.user = res.data
      })
    },
    logOut() {
      localStorage.removeItem('token')
      axios.get('/').then(() => {})
      location.reload()
    },
    submitPassword() {
      const data = {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          confirm_newPassword: this.confirm_newPassword,
      } 
      axios
        .put("/user/" + this.user.id, data)
        .then(() => {
          alert('Password updated')
          this.$router.push({ path: "/" });
        })
        .catch((e) => console.log(e));
    },
  }
}
</script>
