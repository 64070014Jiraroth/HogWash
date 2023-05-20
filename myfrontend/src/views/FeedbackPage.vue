<template>
    <div class="feedback-border" v-if="user && user.role == 'admin'">
        <p style="font-size: 40px;font-weight: bold;">กล่องข้อความ</p>
        <table class="history-table">
            <tr>
                <th>ส่งโดย</th>
                <th>หัวข้อเรื่อง</th>
                <th>คำอธิบาย</th>
                <th>วันที่</th>
            </tr>
            <tr v-for="feed in feedback" :key="feed.id" style="cursor:pointer;background:color:black" @click="feedback_choose = feed, readFeedback()">
                <td>
                    <span v-for="em in email" :key="em.id">
                        <span v-if="em.id === feed.user_id">
                            {{ em.email }}
                        </span>
                    </span>
                </td>
                <td>
                    {{ cutText(feed.title, 30) }}
                </td>
                <td>
                     {{ cutText(feed.description, 30) }}
                </td>
                <td>{{ feed.feedback_date }}</td>
                <!-- <td>
                    <b-button class="readButton" @click="feedback_choose = feed, readFeedback()">
                        read
                    </b-button>
                </td> -->
            </tr>
        </table>
    </div>
</template>

<script>
import axios from "@/plugins/axios";
import "../assets/css/feedback.css";

export default {
    props: ["user"],
    data() {
        return {
            feedback: [],
            email: [],
            feedback_choose: "",
        }
    },
    mounted() {
        this.getFeedback();
    },
    methods: {
        getFeedback() {
            axios.get("feedback")
            .then((response) => {
                this.feedback = response.data.feedback;
                this.email = response.data.email;
            })
            .catch((err) => {
            console.log(err);
            });
        },
        cutText(text, maxLength) {
            if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
            }
            return text;
        },
        readFeedback() {
            console.log('Row clicked');
            console.log('this.feedback_choose1', this.feedback_choose.id)
            axios
                .get(`/feedback/${this.feedback_choose.id}`)
                .then(() => {
                    console.log('this.feedback_choose2', this.feedback_choose)
                })
                .catch((error) => {
                console.log(error.response.data.message)

                });
                
            }
    },
}
</script>

