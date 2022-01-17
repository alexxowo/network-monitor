import { Agent } from "./agent";
import {Queries} from "./queries"

export class Host implements Queries {
  public name: string = '';
  public address: string = '';
  public port: number = 10050;
  public agent: Agent = Agent.Agent;

  constructor(name:string, address:string, port:number, agent=Agent.Agent){
    this.name = name;
    this.address = address;
    this.port = port;
    this.agent = agent;
  }

  public get():any{
    return JSON.stringify(this)
  }
}