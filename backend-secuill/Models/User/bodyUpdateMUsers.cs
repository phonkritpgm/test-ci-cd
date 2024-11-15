using Microsoft.Extensions.Configuration.UserSecrets;

namespace backend_secuill.Models.User
{
    public class bodyUpdateMUsers
    {
        public string userId { get; set; }
        public string userName { get; set; }

        public byte? locationId { get; set; }
        
        public string locationCode { get; set; }

        public string locationName { get; set; }
        
        public string perId { get; set; }

        public string userAssign { get; set; }
    }
}
