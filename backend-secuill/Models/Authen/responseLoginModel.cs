namespace backend_secuill.Models.Authen
{
    public class responseUserModel{
        public string UID { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Department { get; set; }
        public int? LocationId { get; set; }
        public string? LocationCode{ get; set; }
        public string? LocationName { get; set; }
        public int Status { get; set; }
        public string PermissionID { get; set; }
        public string PermissionName { get; set; }

        //new requirement [ 2 machine ]
        public string MachineNumber { get; set; }
        public string MachineLocationName { get; set; }
    }
    public class responseLoginModel
    {
        public string username { get; set; }
        public string token { get; set; }
        public DateTime? Exp { get; set; }
        public responseUserModel User { get; set; }

    }

    
}
