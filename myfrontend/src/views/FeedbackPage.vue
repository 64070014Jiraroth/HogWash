<template>
    <div class="feedback-border">
        <p style="font-size: 40px;font-weight: bold;">กล่องข้อความ</p>
        <table class="history-table">
            <tr >
                <th>ส่งโดย</th>
                <th>หัวข้อเรื่อง</th>
                <th>คำอธิบาย</th>
                <th>วันที่</th>
            </tr>
            <tr v-for="feed in feedback" :key="feed.id">
                <td>
                    <span v-for="em in email" :key="em.id">
                        <span v-if="em.id === feed.user_id">
                            {{ em.email }}
                        </span>
                    </span>
                </td>
                <td>
                    {{ truncateText(feed.title, 30) }}
                </td>
                <td>
                     {{ truncateText(feed.description, 30) }}
                </td>
                <td>{{ feed.feedback_date }}</td>
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
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
            }
            return text;
        }
    },
}
</script>

