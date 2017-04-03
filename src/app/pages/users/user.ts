export class User
{
            Id :number;
          Username :string;
          Fullname :string;
          Password :string;
          Email :string;
          Phone :number;
          ParentId :number;
          Description :string;
          RecordStatus :string;
          AuthStatus :string;
          CreateDt :Date;
          ApproveDt :Date;
          EditDt :Date;
          MakerId:string;
          CheckerId :string;
          EditorId :string;
          Apptoken :string;
          Domain:string;
          DomainDesc: string;
          constructor()
          {
            this.Id = 0;
            this.Username ='';
          this.Fullname ='';
          this.Password = '';
          this.Email ='';
          this.Phone = null;
          this.ParentId = null;
          this.Description ='';
          this.RecordStatus ='';
          this.AuthStatus ='';
          this.CreateDt = new Date();
          this.ApproveDt = new Date();
          this.EditDt = new Date();
          this.MakerId = '';
          this.CheckerId ='';
          this.EditorId ='';
          this.Apptoken ='';
          this.Domain='';
          this.DomainDesc='';

          }
}