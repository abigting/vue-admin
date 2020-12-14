import Message from 'element-ui'

class Cache {
  // 前缀
  prefix = 'YHZX';
  // 过期时间，默认100天
  expires = 24 * 60 * 60 * 100;

  /**
   *
   * @param {string} prefix
   * @param {number} expires
   */
  constructor(prefix, expires) {
    if (prefix) {
      this.prefix = prefix.toString();
    }
    if (expires) {
      this.expires = parseInt(expires, 10);
    }
  }

  /**
   * 设置缓存
   * @param key           缓存名
   * @param value         缓存值
   * @param expires       缓存有效时间
   * @returns {boolean}   成功：true, 失败：false
   */
  set(key, value, expires) {
    // 非法缓存名过滤
    if (key === undefined || key === '' || typeof key === 'object') {
      console.error('设置的缓存名不合法！');
      return false;
    }

    // 非法缓存时间过滤
    if (!expires || typeof expires !== 'number') {
      // console.error('设置缓存过期时间不合法，已使用默认缓存时间！');
      expires = this.expires;
    } else {
      expires = parseInt(expires, 10);
    }

    // localStorage中存储数据的键值
    let cacheName = this.prefix + '-[' + key.toString() + ']';
    // 获取过期到秒的时间戳
    let expiresTime = Date.parse(new Date()) / 1000 + expires;
    // 初始化存储数据
    const data = {
      type: typeof value,
      value: value,
      expires: expiresTime,
    };

    // 存入localStorage
    try {
      window.localStorage.setItem(cacheName, JSON.stringify(data));
      return true;
    } catch (err) {
      console.error('存储失败：' + JSON.stringify(err));
      return false;
    }
  }

  /**
   * 读取缓存内容
   * @param key
   * @returns {*}
   */
  get(key) {
    // 获取当前到秒的时间戳，用于判断是否过期
    let currentTime = Date.parse(new Date()) / 1000;

    // 非法缓存名过滤
    if (key === undefined || key === '' || typeof key === 'object') {
      console.error('读取的缓存名不合法！');
      return false;
    }

    // 获取localStorage中要读取的缓存名
    let cacheName = this.prefix + '-[' + key.toString() + ']';
    try {
      const cacheData = JSON.parse(window.localStorage.getItem(cacheName));
      // 判断判断缓存是否过期
      if (cacheData.expires < currentTime) {
        this.remove(key);
        console.error('读取的缓存数据已过期!');
        return false;
      }
      return cacheData.value;
    } catch (err) {
      if(key === 'menuList' || key==='auths'){
        const {location} = window;
        //history模式
        // if(location.pathname==='/'||location.pathname==='/register'){
        //hash模式
        if(location.hash==='#/'||location.pathname==='#/register'){
          return
        }else {
          Message.info('无法获取导航栏数据，请重新登录');
          setTimeout(()=>
            window.location.href = `${process.env.url}#/`,600
          );
          return;
        }
      }
      // console.error(key, '读取数据失败：' + JSON.stringify(err));
      return false;
    }
  }

  /**
   * 移除一个缓存
   * @param key
   * @returns {boolean}
   */
  remove(key) {
    // 非法缓存名过滤
    if (key === undefined || key === '' || typeof key === 'object') {
      console.error('移除的缓存名不合法！');
      return false;
    }
    let cacheName = this.prefix + '-[' + key.toString() + ']';
    try {
      window.localStorage.removeItem(cacheName);
      return true;
    } catch (err) {
      console.error('移除指定缓存数据失败：' + JSON.stringify(err));
      return false;
    }
  }

  /**
   * 清空所有缓存数据
   */
  clear() {
    try {
      window.localStorage.clear();
      return true;
    } catch (err) {
      console.error('清空所有缓存数据失败：' + JSON.stringify(err));
      return false;
    }
  }
}

const storage = new Cache();
export default storage;