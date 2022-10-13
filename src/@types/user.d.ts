interface ReqLogin {
  username: string;
  password: string;
}
interface ResLoginApi extends Res {
  data: {
    access_token: string;
  };
}

interface UserInfo {
  id: number;
  name: string;
  age: number;
}

interface ResLogin extends ActionRedux {}
