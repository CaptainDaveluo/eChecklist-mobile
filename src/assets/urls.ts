export class URLS{
  public static baseUrl:string='http://10.2.1.121:8098';
  public static localTestUrl:string='http://127.0.0.1:3000';

  public static getinstanceUrl : string=URLS.baseUrl+'/api/instance/listall';
  public static addinstanceUrl: string=URLS.baseUrl+'/api/instance/addone';
  public static deletinstanceUrl: string=URLS.baseUrl+'/api/instance/deletinstance';
  public static updateinstanceUrl: string=URLS.baseUrl+'/api/instance/updateinstance';
  public static gettemplatesUrl: string=URLS.baseUrl+'/api/template/listall';
  public static updatetemplateUrl:string=URLS.baseUrl+'/api/template/updatetemplate';

  //setp service url
  public static getsteplistUrl:string=URLS.baseUrl+'/api/workflow/getdetails';
  public static addstepUrl:string=URLS.baseUrl+'/api/step/addone';
  public static deletestepUrl:string=URLS.baseUrl+'/api/step/deletstep';
  public static updatestepUrl:string=URLS.baseUrl+'/api/step/updatestep';

  //workflow service url
  public static getworkflowlistUrl:string=URLS.baseUrl+'/api/workflow/listall';
  public static addworkflowUrl:string=URLS.baseUrl+'/api/workflow/addone';
  public static deleteworkflowUrl:string=URLS.baseUrl+'/api/workflow/deletone';
  public static updateworkflowUrl:string=URLS.baseUrl+'/api/workflow/updateone';
  ////TODO change the api url after backend finished
  public static getinstancedetailUrl: string=URLS.localTestUrl+'/getInstanceDetail';
}
