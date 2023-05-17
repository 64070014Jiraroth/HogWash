<template>
    <div :style="{'background-image':'url(https://cdn.discordapp.com/attachments/317865493090533376/1088883213784584272/image.png)'}">
        <!-- section 1 -->
        <section id="contact">
            <div class="contact">
                <p style="font-size: 40px;font-weight: bold;">ช่องทางการติดต่อ</p>
                <table>
                        <tr>
                            <td><img class="icon" src="/img/contact/phone.png"></td>
                            <td>0912345678</td>
                        </tr>
                        <tr>
                            <td><img class="icon" src="/img/contact/mail.png"></td>
                            <td>hogwash@gmail.com</td>
                        </tr>
                        <tr>
                            <td><img class="icon" src="/img/contact/line.png"></td>
                            <td>@HogWashLaundry</td>
                        </tr>
                </table>
            </div>
            <div class="mailbox">
            <!-- <div class="mailbox" v-show="mailSent == false"> -->
                <p style="font-size: 25px;">หรือติดต่อเราผ่าน <b>กล่องข้อความ</b> ทันทีได้ที่นี่</p>
                <form class="mailbox-form" action="/contact/" enctype="multipart/form-data" method="POST">
                    <div class="col-md-6">
                        <label style="font-size: 18px;">หัวข้อเรื่อง</label>
                        <input type="text" class="form-control" placeholder="" id="comment_title" v-model="feedbackTitle">
                    </div><br>
                        <label style="font-size: 18px;">รายละเอียด</label>
                        <textarea type="text" class="form-control" style='height:100px;resize: none;' placeholder="" id="comment_detail" v-model="feedbackDes"></textarea>
                        <!-- <div class="card card_login" v-show="show_signIn"> -->
                        <button type="button" :class=" ['btn sendMail', mailSent ? 'disabled' : ' '] " 
                        @click="mailSent = !mailSent, addFeedback()" v-show="mailSent == false" on>
                        ส่งข้อความ</button>
                        <button type="button" class="btn sendMail disabled" v-show="mailSent" style="width:180px" on>✓ ส่งข้อความแล้ว</button>
                </form>
            </div>
            <div class="mailbox" v-show="mailSent">
                 <!-- <p style="font-size: 23px;">✓ ส่งข้อความแล้ว</p> -->
            </div>
        </section>
    </div>
</template>
  
<script>
import "../assets/css/contact.css";
import axios from "axios";
export default {
    name: 'HomePage',
    props: {
        news: Array
    },
    computed: {
        backgroundImg() {
            return `background-image: url("https://cdn.discordapp.com/attachments/317865493090533376/1088883213784584272/image.png");`;
        }
    },
    data() {
        return {
            mailSent: false,
            feedback: [],
        }
    },
    methods: {
        addFeedback() {
        axios
        .post(`http://localhost:3000/contact`, {
          feedbackTitle: this.feedbackTitle,
          feedbackDes: this.feedbackDes,
        })
        .then((response) => {
          this.feedback.push(response.data);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
        }
    }
}
</script>


<style scoped lang="scss">
.container {
//   background-image: url('~@/assets/img/background.png');
  background-image: url("https://cdn.discordapp.com/attachments/317865493090533376/1088883213784584272/image.png");
}