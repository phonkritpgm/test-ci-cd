public class resposeRefillModel{
    public string refill_date {set; get;}
    public string drug_code {set; get;}
    public string drug_name_en {set; get;}
    public int refill_qty {set; get;}
    public string lot_no {set; get;}
    public string refill_time {set; get;}
    public List<UserPickModel> userRefill {set; get;}
    public int? refill_counter { set; get; }
}