using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend_secuill.Interface;
using Microsoft.IdentityModel.Tokens;

namespace backend_secuill.Repositories
{
        public class AuthenRepository : IAuthenRepository{  
        private readonly IConfiguration config = new ConfigurationBuilder()
                   .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false).Build();

        public IEnumerable<Claim> DecodeJWT(string token) {
             var jwtEncodedString = token.Substring(7); 
             var obj_token = new JwtSecurityToken(jwtEncodedString: jwtEncodedString);
             //var username =   obj_token.Claims.First(c=>c.Type=="unique_name").Value;
             return obj_token.Claims;
        }
        public SecurityTokenDescriptor GenerateAccessToken(string userId,string userName,string role, string FullName)
        {          
            var key = Encoding.ASCII.GetBytes(config["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userName.ToString()),
                    new Claim(ClaimTypes.PrimarySid, userId),
                    new Claim(ClaimTypes.Role, role),
                    new Claim("FullName", FullName),
                }),
                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = "Issuer",
                Audience = "Audience",
            };
            return tokenDescriptor;
        }
    }
    
}