// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Form, FormItem, Input, Button, Message, Loading, RadioGroup, RadioButton, Menu,
  MenuItem, MessageBox, TableColumn, Table, Dialog, CheckboxGroup, Checkbox,
  Radio
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Input);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.prototype.$message = Message;
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
