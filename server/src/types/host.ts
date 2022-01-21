import { Agent } from "./agent";
import {Queries} from "./queries"

export class Host implements Queries {
  public hostname: String = '';
  public address: String = '';
  public port: Number = 10050;
  public agent: Agent = Agent.Agent;
  public description: String = '';
  public status: Boolean = true;

  constructor(hostname:string, address:string, port:number, agent=Agent.Agent, description: string, status: boolean = true){
    this.hostname = hostname;
    this.address = address;
    this.port = port;
    this.agent = agent;
    this.description = description;
    this.status = status;
  }

  public get():any{
    return JSON.stringify(this)
  }
}