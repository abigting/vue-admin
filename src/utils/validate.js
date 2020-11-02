/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}


export function idCardValidator(rule, value, callback) {
  const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
  if (!reg.test(value)) {
    callback('请输入正确的身份证号');
  }
  callback();
}

export function phoneValidator(rule, value, callback) {
  const phoneReg = /^1[3-578]\d{9}$/;
  if (value && !phoneReg.test(value)) {
    callback('请填写正确的手机号码');
  }
}

export function emailValidator(rule, value, callback) {
  const emailReg = "\\w+@\\w{2,6}(\\.\\w{2,3})+";
  if (value && !emailReg.test(value)) {
    callback('请填写正确的电子邮件');
  }
}
