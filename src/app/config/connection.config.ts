import {environment} from "../../environments/environment";

export class Config {

  private static url = environment.URL;

  public static get api(): any {
    const repositories_url: string = this.url + 'repositories';
    return {
      //repositories
      repositories: {
        get: repositories_url + '?q=',
      },
    };
  }
}