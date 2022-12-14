import { createQueryBuilder, getRepository,  Like, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }


  async findByTitleContaining(param: string): Promise<Game[]> {
   const games= this.repository
    .createQueryBuilder("games")
    .where("games.title Like : title", { title: `%${param}%`})
    .getMany();

    return games;
  }
  async countAllGames(): Promise<[{ count: string }]> {
    return  this.repository.query("Select COUNT(*) FROM games");
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const user = this.repository
    .createQueryBuilder()
    .relation(Game,"users")
    .of(id)
    .loadMany();
   return user;
}
}
