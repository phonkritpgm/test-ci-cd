using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace backend_secuill.Interface
{
    public interface IAuthenRepository{
        SecurityTokenDescriptor GenerateAccessToken(string userId, string userName, string role,string FullName);
        IEnumerable<Claim> DecodeJWT(string token);
    }
}