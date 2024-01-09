import { CredenciaisInterface } from "data/@types/FormInterface";
import { ApiService } from "./ApiService";
import { LocalStorage } from "./StorageService";
import { UserInterface } from "data/@types/UserInterface";

export const LoginService = {
  async login(credencials: CredenciaisInterface): Promise<boolean> {
    try {
      const { data } = await ApiService.post<{
        access: string;
        refresh: string;
      }>("/auth/token", credencials);

      /*const data = {
        access: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpYS1mZXJuYW5kYTgwQGV4YW1wbGUub3JnIiwiZXhwIjoxNzA0NDEzMDc1LCJpYXQiOjE3MDQ0MTMwNDV9.cBPELs31CkRNKaFTmIwjmw-zYu-hhO10SzzHer5wc1D_6VkzwKVhClWD5IiXaXwnAWgrzrn96Kioq22FWNSE6g',
        refresh: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpYS1mZXJuYW5kYTgwQGV4YW1wbGUub3JnIiwiZXhwIjoxNzA0NDEzMTA1LCJpYXQiOjE3MDQ0MTMwNDV9.l2rTOhV26LScb8lDO9y3mSFiACbK36FXVMZUbfosX1O1i6YYP_PvaE5ukbwdUU__QUtpyLnGX8c9OWieBDPpVw'
      }*/

      LocalStorage.set("token", data.access);
      LocalStorage.set("token_refresh", data.refresh);

      ApiService.defaults.headers.common.Authorization = `Bearer ${data.access}`;
      return true;
    } catch (error) {
      return false;
    }
  },
  async logout(): Promise<void> {
    ApiService.post("/auth/logout/", {
      refresh: LocalStorage.get("token_refresh", ""),
    });

    LocalStorage.clear("token");
    LocalStorage.clear("token_refresh");
  },
  async getUser(): Promise<UserInterface | undefined> {
    const token = LocalStorage.get("token", "");

    if (token) {
      ApiService.defaults.headers.common.Authorization = `Bearer ${token}`;
      return (await ApiService.get<UserInterface>("/api/me")).data;
    }

    return undefined;
  },
};
