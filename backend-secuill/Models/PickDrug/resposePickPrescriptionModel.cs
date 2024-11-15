
public class resposePickPrescription {
    public string pres_orderacceptdate {set; get;}
    public string ward { set; get; }
    public string pres_no {set; get;}
    public string hn { set; get; }
    public string patient { set; get; }
    public string drug_name {set; get;}
    public int pres_orderqty {set; get;}
    public string pres_orderaccepttime {set; get;}
    public int pick_qty {set; get;}
    public string pick_time {set; get;}
    public List<UserPickModel> userPick  {set; get;}

}