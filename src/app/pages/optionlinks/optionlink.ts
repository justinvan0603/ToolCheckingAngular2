export class Optionlink
    {
          Id :number;
          OptionsId :number;
          DomainId :string;
          Link :string;
          RecordStatus :string;
          CreateDt :Date;
          MakerId :string;
          constructor()
          {
              this.Id = 0;
              this.OptionsId = 0;
              this.DomainId = '';
              this.Link = '';
              this.RecordStatus = '';
              this.CreateDt = new Date();
              this.MakerId = '';
          }
    }