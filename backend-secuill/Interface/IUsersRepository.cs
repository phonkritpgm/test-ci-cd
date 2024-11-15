using backend_secuill.Database.SECUILL;
using backend_secuill.Models;
using backend_secuill.Models.Authen;
using backend_secuill.Models.User;

namespace backend_secuill.Interface
{
    public interface IUsersRepository
    {
        Task<MUserLogin> GetByUsernameAsync(string username);

        Task<bool> AddMUsersAsync(MUser muser);

        Task<bool> AddMUsersLoginAsync(MUserLogin mUserLogin);
        Task<responseUserFromHIS> ResponseUserFromHIS(string username);
        
        Task<List<responseUsers>> GetAllUsers();

        Task<List<responseUserPermission>> GetUserPermission();

        Task<List<responseWardMaster>> GetWardMaster();

        Task<bool> UpdateMUsers(bodyUpdateMUsers bodyUser);
    }
}
