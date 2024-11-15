namespace backend_secuill.Models.User
{
    public class responseUsers
    {
        public string userId { get; set; }
        public string userName { get; set; }
        public string userFullName { get; set; }
        public int? userLocationId { get; set; }
        public string userLocationCode { get; set; }
        public string userLocationName { get; set; }
        public string perId { get; set; }
        public string perName { get; set; }

    }

    public class responseUserPermission
    {
        public string perId { get; set; }
        public string perName { get; set; }
        public List<responseUserPermissionFunc> permissionFunction { get; set; }
    }

    public class responseUserPermissionFunc
    {
        public string perId { get; set; }
        public string funcCode { get; set; }
        public string funcName { get; set; }
    }

    public class responseWardMaster
    {
        public string wardCode { get; set; }
        public string wardName { get; set; }
    }

}
