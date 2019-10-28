<template>
  <div class="home">
    <Header></Header>
    <Dialog ref="dialog">
      <Poup v-for="(item, index) in saysHis" :key="index" :mine="index % 2">
        {{ item }}
      </Poup>
    </Dialog>
    <div class="input">
      <input
        type="text"
        v-model="text"
        placeholder="请输入聊天内容"
        @keydown="handlerKeyDown"
      />
      <div class="button" @click="handlerSendMessage">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      msg: "",
      saysHis: ["你好,我是图灵机器人,很高兴为您服务"],
      text: ""
    };
  },
  mounted() {},
  methods: {
    requestRobot() {
      let userId = sessionStorage.getItem("userId");
      if (!userId) {
        const uuidv1 = require("uuid/v1");
        userId = uuidv1()
          .replace(/-/g, "")
          .slice(0, 16);
        sessionStorage.setItem("userId", userId);
      }
      this.$axios
        .post("", {
          reqType: 0,
          perception: {
            inputText: {
              text: this.text
            }
          },
          userInfo: {
            userId: userId
          }
        })
        .then(e => {
          this.msg = e.results[0].values.text;
          this.saysHis.push(this.msg);
          this.$nextTick(this.toBottom);
        })
        .catch(e => {
          this.msg = e.msg;
          this.saysHis.push(this.msg);
          this.$nextTick(this.toBottom);
        });
      this.text = "";
    },
    handlerKeyDown(e) {
      if (e.keyCode == 13) {
        this.handlerSendMessage();
      }
    },
    handlerSendMessage() {
      if (!this.text.trim()) {
        alert("请输入对话内容");
        return;
      }
      this.saysHis.push(this.text);
      this.requestRobot();
    },
    toBottom() {
      this.$refs.dialog.$el.scrollTo({
        top: this.$refs.dialog.$el.scrollHeight,
        behavior: "smooth"
      });
    },
    getLocation() {
      function getPosition() {
        if (navigator.geolocation) {
          //navigator.geolocation.getCurrentPosition这个方法里面有三个参数
          //这个会在界面拉出一个消息框，让用户确认是否允许获取位置,不过pc端我试了都是err，
          //参1，成功后执行的函数
          //参2，失败时执行的函数
          //参3，选项配置，下面是在6000毫秒内结束请求
          navigator.geolocation.getCurrentPosition(
            function(position) {
              var latitude = position.coords.latitude;
              var longitude = position.coords.longitude;
              console.log(
                "Latitude : " + latitude + " Longitude: " + longitude
              );
              console.log(position);
            },
            function(err) {
              console.log(err, "您的浏览器不支持此项技术");
            },
            { timeout: 6000 }
          );
        }
      }
      getPosition();
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .fcc;
  .input {
    position: relative;
    z-index: 1;
    .fs;
    width: 100%;
    height: 100px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    input {
      box-sizing: border-box;
      display: block;
      height: 100%;
      padding: 10px;
      font-size: 28px;
      flex: 1;
    }
    .button {
      .fc;
      margin: 5px;
      width: 175px;
      height: 76px;
      font-size: 32px;
      color: #fff;
      background: rgb(56, 146, 206);
      border-radius: 10px;
    }
  }
}
</style>
