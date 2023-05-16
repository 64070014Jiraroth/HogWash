<template>
  <div>
    <div id="home">

      <!-- section 1 -->
      <!-- <section id="home1" v-bind:style="{'background-image' : 'url(' + require('../assets/img/background.png') + ')' }"> -->

      <!-- div 1 -->
      <div id="home1">
      <div class="intro">
        <div class="slogan">
          <p style="font-size: 80px">HogWash<br />Laundry</p>
          <p>ระบบให้บริการซักผ้า</p>
          <p>โดยไม่ต้องใช้เหรียญ</p>
        </div>
        <div class="vl"></div>
        <div class="detail">
          <table>
            <tr>
              <th id="detail-table">ซักเร็ว</th>
              <th id="detail-table">ซักธรรมดา</th>
            </tr>
            <tr>
              <td id="detail-table">
                20 บาท <br />
                <div class="hl"></div>
                30 นาที
              </td>
              <td id="detail-table">
                30 บาท <br />
                <div class="hl"></div>
                50 นาที
              </td>
            </tr>

            <tr>
              <th id="detail-table">ซักน้ำร้อน</th>
              <th id="detail-table">ซักน้ำเย็น</th>
            </tr>
            <tr>
              <td id="detail-table">
                50 บาท <br />
                <div class="hl"></div>
                50 นาที
              </td>
              <td id="detail-table">
                50 บาท <br />
                <div class="hl"></div>
                50 นาที
              </td>
            </tr>
          </table>
        </div>
      </div>
        <a href="#home2" class="arrow-container">
          <div class="arrow-down"></div>
          <div class="arrow-down"></div>
          <div class="arrow-down"></div>
        </a>
      </div>
      <!-- div 2 -->
      <div id="home2">
        <a href="#home1" class="arrow-container">
          <div class="arrow-up"></div>
          <div class="arrow-up"></div>
          <div class="arrow-up"></div>
        </a>
        <!-- Washing Machine cards -->
        <div class="allCard">
          <div class="row justify-content-center groupCard my-2">
            <div class="col-3" v-for="wm in  Washing_machine " :key="wm.id">
              <div :class="[
                  'card',
                  wm.wm_status == 0 ? ' border0' : '',
                  wm.wm_status == 1 ? ' border1' : '',
                  wm.wm_status == 2 ? ' border2' : '',
                ]">
                <h3 class="card-title">{{ wm.wm_id }}</h3>
                <img class="card-img-top" :src="require('../assets/img/wm.png')" style="padding: 1" />
                <div class="card-body" style="padding-top: 2">
                  <!------------------------------ powder & softener --------------------------------------------- -->
                  <table id="product_table">
                    <tr>
                      <td><img class="product_img" :src="require('../assets/img/powder.png')" /></td>
                      <td><img class="product_img" :src="require('../assets/img/softener.png')" /></td>
                    </tr>
                    <tr>
                      <td>
                        <p class="card-text">
                          <small class="text-muted"> {{ wm.powder }}%</small>
                        </p>
                      </td>
                      <td>
                        <p class="card-text">
                          <small class="text-muted"> {{ wm.softener }}%</small>
                        </p>
                      </td>
                    </tr>
                  </table>
                  <div v-show="wm.wm_status == 0">
                    <!-- <h4 class="card-text">
                                        <div style="color:#7CCF85;">สถานะ : ว่าง</div>
                                    </h4> -->
                    <button :disabled="online == false" type="button" class="btn btn-light" data-toggle="modal"
                      data-target="#available" style="background-color: #7ccf85; color: white" @click="wm.wm_status = 2;
                      wm_choose = wm;
                                            ">
                      เลือกใช้งาน
                    </button>
                    <h4 class="card-text">
                      <div style="color: #7ccf85">สถานะ : ว่าง</div>
                    </h4>
                  </div>
                  <div v-show=" wm.wm_status == 1 ">
                    <h4 class="card-text">
                      <div style="color: #dd6060">
                        00:<span id="min">{{
                          Math.floor(wm.time_left / 60)
                          }}</span>:<span id="sec">{{ wm.time_left % 60 }}</span>
                      </div>
                    </h4>
                    <button :disabled=" online == false " type="button" class="btn btn-light" data-toggle="modal"
                      data-target="#queue" style="background-color: #dd6060; color: white" @click=" wm_choose = wm ">
                      จองคิว
                    </button>
                  </div>
                  <div v-show=" wm.wm_status == 2 ">
                    <h4 class="card-text">
                      <div style="color: #f1d438">อยู่ระหว่างดำเนินการ</div>
                    </h4>
                    <button :disabled=" online == false " type="button" class="btn btn-light"
                      style="background-color: #f1d438; color: white" @click=" wm_choose = wm ">
                      รอสักครู่
                    </button>
                  </div>
                  <p class="card-text">
                    <!-- <small class="text-muted"
                      >จำนวนคิวต่อใช้งาน : {{ wm.queue_id }}</small
                    > -->
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- modal available -->

        <div class="modal fade" id="available" tabindex="-1" role="dialog" data-backdrop="static">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-4">
              <div class="modal-header">
                <h1 class="modal-title w-100 text-center">เลือกรูปแบบการซัก</h1>
                <!-- <button type="button" class="btn-close closeModal" aria-label="Close" data-dismiss="modal"></button> -->
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-6" v-for=" op  in  options " :key=" op.id ">
                      <button type="button" class="col btn selectOption w-100" data-dismiss="modal" data-toggle="modal"
                        href="#selectPayment" @click=" option_select(op) ">
                        <h5>{{ op.option_name }}</h5>
                        <small>{{ op.option_cost }} บาท /
                          {{ op.option_time / 60 }} นาที</small>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal" @click=" back_status() ">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- selectPayment -->
        <div class="modal fade" tabindex="-1" role="dialog" id="selectPayment" data-backdrop="static">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-4">
              <div class="modal-header">
                <h4 class="modal-title w-100 text-center">
                  ช่องทางการชำระเงิน
                </h4>
                <!-- <button type="button" class="btn-close closeModal" aria-label="Close" data-dismiss="modal"></button> -->
              </div>
              <div class="container-fluid">
                <div class="modal-body">
                  <div class="row">
                    <!-- <div class="col-6" v-for="pay in payments" :key="pay.id">
                      <button
                        type="button"
                        class="col btn selectOption w-100"
                        data-dismiss="modal"
                        data-toggle="modal"
                        href="#confirmPayment"
                        @click="payment_select(pay)"
                      >
                        <img :src="pay.pay_img" />
                        <b>{{ pay.pay_name }}</b>
                      </button>
                    </div> -->
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-light" data-dismiss="modal" data-toggle="modal"
                    data-target="#available">
                    Back
                  </button>
                  <button type="button" class="btn btn-light" data-dismiss="modal" @click=" back_status() ">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- confirmPayment -->
        <div class="modal fade" id="confirmPayment">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-4">
              <div class="modal-header">
                <h1 class="modal-title w-100 text-center">
                  ยืนยันการชำระเงินเสร็จสิ้น
                </h1>
                <!-- <button type="button" class="btn-close closeModal" aria-label="Close" data-dismiss="modal"></button> -->
              </div>
              <div class="container-fluid">
                <div class="modal-body confirmedText">
                  <p>กรุณารอสักครู่ ระบบกำลังเตรียมดำเนินการ</p>
                  <p style="color: #dd6060">! ข้อควรระวัง !</p>
                  <p style="color: #dd6060">
                    โปรดตรวจสอบให้แน่ใจว่านําผ้าใส่ถังซักเรียบร้อยแล้วก่อนกดยืนยัน
                  </p>
                  <input type="checkbox" class="form-check-input" @click=" isCheck = !isCheck " />
                  รับทราบ <br /><br />
                  <button type="button" :class=" ['btn confirmed', isCheck ? '' : ' disabled'] "
                    style="background-color: #59a8b9; color: white" data-dismiss="modal" @click=" count_time(wm_choose) ">
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- modal queue -->
        <div class="modal fade" id="queue" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-4">
              <div class="modal-header" style="border: none; margin-top: 30px">
                <h1 class="modal-title w-100 text-center">
                  เครื่องไม่พร้อมใช้งานในขณะนี้<br />
                  เนื่องจากมีการใช้งานอยู่
                </h1>
                <!-- <button type="button" class="btn-close closeModal" aria-label="Close" data-dismiss="modal"></button> -->
              </div>
              <div class="modal-body">
                <button type="button" class="btn queueOption" data-toggle="modal" data-target="#queue2"
                  data-dismiss="modal" style="background-color: #59a8b9; color: white">
                  จองคิว
                </button>
                <!-- <small class="text-muted py-4">จำนวนคิวต่อใช้งานในขณะนี้ : 1</small> -->
                <button type="button" class="btn queueOption" style="background-color: #b3b3b3; color: white"
                  data-dismiss="modal">
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- modal page2 queue -->
        <div class="modal fade" id="queue2" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-4">
              <div class="modal-header" style="border: none; margin-top: 30px">
                <h1 class="modal-title w-100 text-center">
                  <!-- ลำดับคิวของคุณ : {{ wm_choose.queue_id + 1 }} -->
                </h1>
                <!-- <button type="button" class="btn-close closeModal" aria-label="Close" data-dismiss="modal"></button> -->
              </div>
              <div class="modal-body">
                <button type="button" class="btn queueOption" data-toggle="modal" data-target="#queue3"
                  data-dismiss="modal" style="background-color: #59a8b9; color: white">
                  ยืนยันการจอง
                </button>
                <button type="button" class="btn queueOption" style="background-color: #b3b3b3; color: white"
                  data-dismiss="modal">
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- modal page3 queue confirmed -->
        <div class="modal fade" id="queue3" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-4">
              <div class="modal-header" style="border: none; margin-top: 30px">
                <h1 class="modal-title w-100 text-center">
                  ยืนยันการจองเสร็จสิ้น
                </h1>
                <!-- <button type="button" class="btn-close closeModal" aria-label="Close" data-dismiss="modal"></button> -->
              </div>
              <div class="modal-body">
                <h5>ระบบจะแจ้งให้ทราบเมื่อถึงคิวของคุณ</h5>
                <h5>และโปรดยืนยันการใช้งานต่อภายในเวลาที่กำหนด</h5>
                <br />
                <button type="button" class="btn confirmed" @click=" putQueue() "
                  style="background-color: #59a8b9; color: white" data-dismiss="modal">
                  เข้าใจแล้ว
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- got queue -->
        <div class="modal fade" id="gotQueue" tabindex="-1" role="dialog" data-backdrop="static">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-4">
              <div class="modal-header" style="border: none; margin-top: 30px">
                <h1 class="modal-title w-100 text-center">
                  ถึงคิวการใช้งานของคุณแล้ว
                </h1>
                <!-- <button type="button" class="btn-close closeModal" aria-label="Close" data-dismiss="modal"></button> -->
              </div>
              <div class="modal-body">
                <h5>หมายเลขเครื่องซักผ้า : 003</h5>
                <h5 style="color: #dd6060">
                  <b>กรุณายืนยันการใช้งานต่อภายใน 10 นาที</b>
                </h5>
                <button type="button" class="btn queueOption" data-toggle="modal" data-target="#available"
                  data-dismiss="modal" style="background-color: #59a8b9; color: white">
                  ยืนยันการใช้งานต่อ
                </button>
                <button type="button" class="btn queueOption" style="background-color: #b3b3b3; color: white"
                  data-dismiss="modal">
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- จองไปแล้วและกดเครื่องเดิมซํ้า -->
        <div class="modal fade" id="editQueue" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-4">
              <div class="modal-header" style="border: none; margin-top: 30px">
                <h1 class="modal-title w-100 text-center">
                  ลำดับคิวของคุณ : 0
                </h1>
                <!-- <button type="button" class="btn-close closeModal" aria-label="Close" data-dismiss="modal"></button> -->
              </div>
              <div class="modal-body">
                <button type="button" class="btn queueOption" data-dismiss="modal"
                  style="background-color: #59a8b9; color: white">
                  ยืนยัน
                </button>
                <button type="button" class="btn queueOption" data-dismiss="modal" data-toggle="modal"
                  data-target="#editQueue2" style="background-color: #dd6060; color: white">
                  ยกเลิกคิว
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- editQueue2 -->
        <div class="modal fade" id="editQueue2" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-4">
              <div class="modal-header" style="border: none; margin-top: 30px">
                <h1 class="modal-title w-100 text-center">
                  ยืนยันการยกเลิกคิวปัจจุบัน
                </h1>
                <!-- <button type="button" class="btn-close closeModal" aria-label="Close" data-dismiss="modal"></button> -->
              </div>
              <div class="modal-body">
                <button type="button" class="btn queueOption" data-dismiss="modal"
                  style="background-color: #59a8b9; color: white">
                  ไม่ดีกว่า
                </button>
                <button type="button" class="btn queueOption" data-dismiss="modal" data-toggle="modal"
                  data-target="#editQueue2" style="background-color: #dd6060; color: white">
                  ยืนยันการยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- จองไปแล้วและไปกดเครื่องอื่น -->
        <div class="modal fade" id="inQueue" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-4">
              <div class="modal-header" style="border: none; margin-top: 30px">
                <h1 class="modal-title w-100 text-center">
                  ขณะนี้คุณอยู่ในลำดับคิวการใช้งาน<br />
                  ของเครื่องหมายเลข 003
                </h1>
                <!-- <button type="button" class="btn-close closeModal" aria-label="Close" data-dismiss="modal"></button> -->
              </div>
              <div class="modal-body">
                <button type="button" class="btn confirmed" style="background-color: #59a8b9; color: white"
                  data-dismiss="modal">
                  เข้าใจแล้ว
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ซักเสร็จแล้วเย่ -->
        <div class="modal fade" id="completed" tabindex="-1" role="dialog" data-backdrop="static">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-4">
              <div class="modal-header" style="border: none; margin-top: 30px">
                <h1 class="modal-title w-100 text-center">
                  ผ้าของคุณซักเสร็จเรียบร้อยแล้ว
                </h1>
                <!-- <button type="button" class="btn-close closeModal" aria-label="Close" data-dismiss="modal"></button> -->
              </div>
              <div class="modal-body">
                <div class="modal-body confirmedText">
                  <p style="color: #dd6060; font-weight: bold">
                    กรุณานำผ้าออกจากเครื่องก่อนกดยืนยัน
                  </p>
                  <input type="checkbox" class="form-check-input" @click=" isCheck = !isCheck " />
                  นำผ้าออกจากเครื่องเรียบร้อยแล้ว <br /><br />
                  <button type="button" :class=" ['btn confirmed', isCheck ? '' : ' disabled'] "
                    style="background-color: #59a8b9; color: white" data-dismiss="modal" @click=" count_time(wm_choose) ">
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- changePassword -->
      <!-- <div class="modal fade" id="changePassword" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content rounded-4 modalChangepass">
                    <div class="card changePass">
                        <div class="card-body">
                            <h5 class="card-title-changePass mx-3">แก้ไขรหัสผ่าน</h5>
                            <p class="card-text">
                            <form onsubmit="return false">
                                <div class="form-group mx-3 py-3">
                                    <input v-model="new_email" type="password" class="form-control" id="signUpEmail" placeholder="รหัสผ่านปัจจุบัน" required>
                                </div>
                                <div class="form-group mx-3 py-3">
                                    <input v-model="new_password1" type="password" name="new_ps" class="form-control" id="signUpPassword" placeholder="รหัสผ่านใหม่" required>
                                </div>
                                <div class="form-group mx-3 py-3">
                                    <input v-model="new_password2" type="password" name="new_ps" class="form-control" id="confirmPassword" placeholder="ยืนยันรหัสผ่านใหม่" required>
                                </div>
                                <button class="button-changePass btn py-2 mb-3" type="submit" style="background-color:#59A8B9;color:white;"
                                    @click="changePassword()">
                                    บันทึกการเปลี่ยนแปลง
                                </button><br>
                            </form>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
  </div>
</template>

<script>
// import "../assets/css/home.css";
export default {
  name: 'HomePage',
  el: '#home',
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
      wm_img: '../img/wm.png',
      powder_img: '../img/powder.png',
      softener_img: '../img/softener.png',
      modal_choose: false,
      choose_id: '',
      isCheck: false,
      online: false,
      online_user: '',
      in_queue: false,

      wm_choose: '',
      option_choose: '',
      time_cost: 0,
      pay_choose: '',

      Washing_machine: [
        {
          wm_id: '001',
          wm_brand: 'Samsung',
          wm_model: '',
          wm_status: 0,
          queue_id: 0,
          time_left: 0,
          powder: 100,
          softener: 100,
        },
        {
          wm_id: '002',
          wm_brand: 'Toshiba',
          wm_model: '',
          wm_status: 0,
          queue_id: 0,
          time_left: 0,
          powder: 100,
          softener: 100,
        },
        {
          wm_id: '003',
          wm_brand: 'Toshiba',
          wm_model: '',
          wm_status: 0,
          queue_id: 0,
          time_left: 0,
          powder: 100,
          softener: 100,
        },
        {
          wm_id: '004',
          wm_brand: 'Toshiba',
          wm_model: '',
          wm_status: 0,
          queue_id: 0,
          time_left: 0,
          powder: 100,
          softener: 100,
        },
        {
          wm_id: '005',
          wm_brand: 'Toshiba',
          wm_model: '',
          wm_status: 0,
          queue_id: 0,
          time_left: 0,
          powder: 100,
          softener: 100,
        },
        {
          wm_id: '006',
          wm_brand: 'Toshiba',
          wm_model: '',
          wm_status: 0,
          queue_id: 0,
          time_left: 0,
          powder: 100,
          softener: 100,
        },
        {
          wm_id: '007',
          wm_brand: 'Toshiba',
          wm_model: '',
          wm_status: 0,
          queue_id: 0,
          time_left: 0,
          powder: 100,
          softener: 100,
        },
        {
          wm_id: '008',
          wm_brand: 'Toshiba',
          wm_model: '',
          wm_status: 0,
          queue_id: 0,
          time_left: 0,
          powder: 100,
          softener: 100,
        },
      ],
      options: [
        {
          option_id: "01",
          option_name: "ซักเร็ว",
          option_cost: 20,
          option_time: 3 //1800
        },
        {
          option_id: "02",
          option_name: "ซักธรรมดา",
          option_cost: 30,
          option_time: 30 //3000
        },
        {
          option_id: "03",
          option_name: "ซักนํ้าร้อน",
          option_cost: 50,
          option_time: 60  //3000
        },
        {
          option_id: "04",
          option_name: "ซักนํ้าเย็น",
          option_cost: 50,
          option_time: 3000
        },
      ],
      payments: [
        {
          pay_name: 'Prompt Pay',
          pay_img: '../img/payments/promptPay.png'
        },
        {
          pay_name: 'True Money Wallet',
          pay_img: '../img/payments/trueMoney.png'
        },
        {
          pay_name: 'Shopee Pay',
          pay_img: '../img/payments/shopeePay.png'
        },
        {
          pay_name: 'Rabbit Line Pay',
          pay_img: '../img/payments/rabbitLinePay.png'
        },
      ],
      history: [

      ],
    };
  },
}
</script>


<style scoped>
#home1 {
  /* background-image: url('https://cdn.discordapp.com/attachments/317865493090533376/1088883213784584272/image.png'); */
  background-image: url('~@/assets/img/background.png');
  background-size: cover;
}
</style>