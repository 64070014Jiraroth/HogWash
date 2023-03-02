var app = new Vue({
    el: '#home',
    data: {
        wm_img: './img/wm.png',
        modal_choose : false,
        choose_id : '',
        isCheck : false,
        online: false,
        online_user: '',
        in_queue: false,

        wm_choose: '',
        option_choose:'',
        time_cost: '',
        pay_choose: '',

        Washing_machine: [
            {
                wm_id: '001',
                wm_brand: 'Samsung',
                wm_model: '',
                wm_status: 0,
                queue_id: 0,
            },
            {
                wm_id: '002',
                wm_brand: 'Toshiba',
                wm_model: '',
                wm_status: 2,
                queue_id: 0
            },
            {
                wm_id: '003',
                wm_brand: 'Toshiba',
                wm_model: '',
                wm_status: 1,
                queue_id: 0
            },
            {
                wm_id: '004',
                wm_brand: 'Toshiba',
                wm_model: '',
                wm_status: 2,
                queue_id: 0
            },
            {
                wm_id: '005',
                wm_brand: 'Toshiba',
                wm_model: '',
                wm_status: 0,
                queue_id: 0
            },
            {
                wm_id: '006',
                wm_brand: 'Toshiba',
                wm_model: '',
                wm_status: 0,
                queue_id: 0
            },
            {
                wm_id: '007',
                wm_brand: 'Toshiba',
                wm_model: '',
                wm_status: 0,
                queue_id: 0
            },
            {
                wm_id: '008',
                wm_brand: 'Toshiba',
                wm_model: '',
                wm_status: 2,
                queue_id: 0
            },
        ],
        options: [
            {
                option_id: "01",
                option_name: "ซักเร็ว",
                option_cost: 20,
                option_time: 30
            },
            {
                option_id: "02",
                option_name: "ซักธรรมดา",
                option_cost: 30,
                option_time: 50
            },
            {
                option_id: "03",
                option_name: "ซักนํ้าร้อน",
                option_cost: 50,
                option_time: 50
            },
            {
                option_id: "04",
                option_name: "ซักนํ้าเย็น",
                option_cost: 50,
                option_time: 50
            },
        ],
        payments: [
            {
                pay_name: 'Prompt Pay',
                pay_img: './img/payments/promptPay.png'
            },
            {
                pay_name: 'True Money Wallet',
                pay_img: './img/payments/trueMoney.png'
            },
            {
                pay_name: 'Shopee Pay',
                pay_img: './img/payments/shopeePay.png'
            },
            {
                pay_name: 'Rabbit Line Pay',
                pay_img: './img/payments/rabbitLinePay.png'
            },
        ],
        history: [

        ],
    },
    created() {
        if (localStorage.getItem("online_status") != null) {
            this.online = JSON.parse(localStorage.getItem("online_status"));  
        }
        if (localStorage.getItem("online_user") != null) {
            this.online_user = JSON.parse(localStorage.getItem("online_user"));  
        }
    },
    methods: {
        logout() {
            console.log(this.online)
            this.online = false
            this.online_user = ''
            localStorage.setItem("online_status", JSON.stringify(this.online));
            localStorage.setItem("online_user", JSON.stringify(this.online_user));
            window.location.reload();
        },
        option_select(op) {
            this.option_choose = op.option_name
            this.time_cost = op.option_time
        },
        payment_select(pay) {
            this.pay_choose = pay.pay_name
        },
        count_time() {
            let wm = this.Washing_machine.filter((data) => { return data.wm_id == this.wm_choose.wm_id})
            wm[0].wm_status = 1;

            if(+this.time_cost > 0) {
                let min = Math.floor(this.time_cost);
                let sec = (this.time_cost*60)%60;
        
                document.getElementById('sec').innerHTML = ("0" + sec).slice(-2);
                document.getElementById('min').innerHTML = ("0" + min).slice(-2);
                
                setInterval(() => { 
                    if(sec <= 0 && min <= 0) {
                        clearInterval();
                    }
                    else if(sec <=0 && min > 0) {
                        sec = 59;
                        min--;
                        document.getElementById('min').innerHTML =  ("0" + min).slice(-2);
                    }
                    else {
                        sec--;
                    }
                    document.getElementById('sec').innerHTML = ("0" + sec).slice(-2); 
                }, 1000);
            }
        },
        back_status() {
            this.wm_choose.wm_status = 0
            wm_choose = ''
        },
    }
})