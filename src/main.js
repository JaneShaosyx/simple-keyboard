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
const isMobile = () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  } else {
    return false;
  }
};
const setHtmlFontSize = () => {
  const htmlDom = document.getElementsByTagName("html")[0];
  let htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  if (htmlWidth >= 1920 && !isMobile()) {
    htmlWidth = 1920;
    htmlDom.style.fontSize = `${(htmlWidth / 1920) * 10}px`;
  }
  if (isMobile()) {
    let htmlHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    htmlDom.style.fontSize = `${(htmlHeight / 1920) * 13}px`;
  }
};
window.onresize = setHtmlFontSize;
setHtmlFontSize();
