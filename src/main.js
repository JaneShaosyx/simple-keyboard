import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
// Event Bus
Vue.prototype.bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// change html font-size when resize the window
const setHtmlFontSize = () => {
  const htmlDom = document.getElementsByTagName("html")[0];
  let htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  if (htmlWidth >= 1920) {
    htmlWidth = 1920;
  }
  if (htmlWidth <= 375) {
    htmlWidth = 375;
  }
  htmlDom.style.fontSize = `${(htmlWidth / 1920) * 10}px`;
};
window.onresize = setHtmlFontSize;
setHtmlFontSize();
