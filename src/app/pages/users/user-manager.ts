import {ApplicationGroup} from "./applicationGroup";
export class UserManager {
  Id: string;
  UserName: string;
  Fullname: string;
  Password: string;
  Email: string;
  Phone: number;
  ParentId: number;
  Description: string;
  RecordStatus: string;
  AuthStatus: string;
  CreateDt: Date;
  ApproveDt: Date;
  EditDt: Date;
  MakerId: string;
  CheckerId: string;
  EditorId: string;
  Apptoken: string;

  // Groups : string;
  Groups: ApplicationGroup[];


  Domain: string;
  DomainDesc: string;

  constructor() {
    this.Id = '';
    this.UserName = '';
    this.Fullname = '';
    this.Password = '';
    this.Email = '';
    this.Phone = null;
    this.ParentId = null;
    this.Description = '';
    this.RecordStatus = '';
    this.AuthStatus = '';
    this.CreateDt = new Date();
    this.ApproveDt = new Date();
    this.EditDt = new Date();
    this.MakerId = '';
    this.CheckerId = '';
    this.EditorId = '';
    this.Apptoken = '';
    this.Domain = '';
    this.DomainDesc = '';
    //   this.Groups='';
    this.Groups = new Array<ApplicationGroup>();
  }
}
