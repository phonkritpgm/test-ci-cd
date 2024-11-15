using System.Runtime.CompilerServices;

public class resposePickFreeOrderModel {
    public string pick_date {set; get;}
    public string ward_name {set; get;}    
    public string hn {set; get;}
    public string pat_name { set; get;} 
    public string order_no {set; get;}
    public string drug_name {set; get;}
    public int pick_qty {set; get;}
    public string pick_time {set; get;}
    public List<UserPickModel> userPick  {set; get;}

}