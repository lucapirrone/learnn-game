import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResponseBodyVO, ResponseVO} from "../interfaces/vo/responseVo";
import {CreateGameDTO} from "../interfaces/dto/createGameDTO";
import {environment} from "../../environments/environment";
const apiUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  public async addGame(createGameDTO: CreateGameDTO): Promise<ResponseBodyVO> {
    return await this.http.post<ResponseBodyVO>(`${apiUrl}/games`, createGameDTO).toPromise();
  }

  public async getGames(): Promise<ResponseBodyVO> {
    return await this.http.get<ResponseBodyVO>(`${apiUrl}/games`).toPromise();
  }
}
