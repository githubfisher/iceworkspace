import { request } from '@/utils/request';
import { userProfile } from '@/config/dataSource';


export default {
  userinfo: {
    name: '',
    nickname: '',
    headimgurl: '',
  },
  userid: '',

  async fetchData() {
    const { data } = await request(userProfile);
    const { name, nickname, headimgurl, id } = data.data.user;
    this.userinfo = { name, nickname, headimgurl };
    this.userid = id;
  },
};
