import axios, { AxiosInstance } from "axios";

export interface IUserPublicProfile {
  name: string;
  username: string;
  bio: string;
  picture: string;
  banner: string;
}

export interface IUserProfile {
  name: string;
  username: string;
  email: string;
  bio: string;
  userId: string;
  picture: string;
  pendingFriendRequests: Array<string>;
  banner: string;
  friends: Array<string>;
}

export default class YTWatchPartyService {
  private _axios: AxiosInstance;

  constructor() {
    const baseURL = "http://localhost:8081";
    this._axios = axios.create({ baseURL });
  }

  async getPublicProfile(username: string): Promise<IUserPublicProfile> {
    return (await this._axios.get(`/api/profile/${username}`)).data;
  }

  async getUserProfile(token: string): Promise<IUserProfile> {
    return (
      await this._axios.get(`/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
  }

  async updateProfile(token: string, toUpdate: any): Promise<IUserProfile> {
    return await this._axios.patch(`/api/profile`, toUpdate, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getFriends(token: string): Promise<Array<IUserPublicProfile>> {
    return (
      await this._axios.get('/api/friends', {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data.friends;
  }

  async getFriendInvites(token: string): Promise<Array<IUserPublicProfile>> {
    return (
      await this._axios.get('/api/friends/invite', {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data.invites;
  }
}