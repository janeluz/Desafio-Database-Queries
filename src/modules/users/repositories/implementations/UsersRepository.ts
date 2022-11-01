import { Users } from "@azure/cosmos";
import { getRepository, Repository } from "typeorm";
import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.createQueryBuilder()
    return user as any;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = this.repository.query(
      `SELECT * FROM users WHERE  ORDER BY first_name ASC`
    );
    return users;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const users = this.repository.query(
      `SELECT * FROM users  where LOWER(first_name) = LOWER('${first_name}') OR LOWER(last_name) = LOWER(´${last_name}')`
    );

    return users;
  }
}
