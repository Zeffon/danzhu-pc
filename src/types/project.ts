export interface Project {
  file_id: number;
  url: string;
  category: number;
  size: number;
  title: string;
  create_time: number;
  wx_info: {
    avatarUrl: string;
    city: string;
    country: string;
    gender: number;
    language: string;
    nickName: string;
    province: string;
  };
}
