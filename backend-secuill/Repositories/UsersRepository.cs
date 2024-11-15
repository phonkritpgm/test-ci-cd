using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Azure.Core;
using backend_secuill.Database.SECUILL;
using backend_secuill.Interface;
using backend_secuill.Models;
using backend_secuill.Models.Authen;
using backend_secuill.Models.User;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace backend_secuill.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly SecuillV5TuContext _context;

        IConfiguration config = new ConfigurationBuilder()
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false).Build();

        public UsersRepository(SecuillV5TuContext context)
        {
            _context = context;
        }

        public async Task<MUserLogin> GetByUsernameAsync(string username)
        {
            var query =  _context.MUserLogins.FirstOrDefaultAsync(user=>user.UloginUsername== username);
            return await query;
        }   

        public async  Task<bool> AddMUsersAsync(MUser muser){
            try
            {
                await _context.MUsers.AddAsync(muser);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception ex) { 
                return false;
            }
        }
        public async Task<bool> AddMUsersLoginAsync(MUserLogin mUserLogin)
        {
            try
            {
                await _context.MUserLogins.AddAsync(mUserLogin);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        
        public async Task<responseUserFromHIS> ResponseUserFromHIS(string username)
        {
            responseUserFromHIS responseUserFromHIS = null;
            SqlConnection conn = new SqlConnection(config.GetConnectionString("pathsql_middle"));
            SqlCommand comm = new SqlCommand("SECUILL_HIS_User", conn);
            SqlDataReader reader = null;
            comm.CommandType = System.Data.CommandType.StoredProcedure;  
            conn.Open();
            comm.Parameters.Clear();
            comm.Parameters.AddWithValue("@UserName", username);
            reader = comm.ExecuteReader();
            while (reader.Read()) 
            {
                responseUserFromHIS = new responseUserFromHIS
                {
                    userName = (string)reader["userName"],
                    DisplayName = (string)reader["DisplayName"]
                };
            }
            conn.Close();
            comm.Dispose();
            if (reader != null)
            {
                reader.Close();
            }
            return responseUserFromHIS;
        }

        public async Task<List<responseUsers>> GetAllUsers()
        {

            var result = await (from a in _context.MUsers
                                join lg in _context.MUserLogins on a.UserId equals lg.UserId
                                join b in _context.MPermissions on a.PerId equals b.PerId into oc
                                from c in oc.DefaultIfEmpty()
                                orderby a.UserLocationName ascending
                                select new
                                {
                                    userId = a.UserId,
                                    userName = lg.UloginUsername,
                                    userFullName = a.UserFullname,
                                    userLocationId = a.UserLocationId,
                                    userLocationCode = a.UserLocationCode,
                                    userLocationName = a.UserLocationName,
                                    perId = c.PerId,
                                    perName = c.PerName,
                                }
            )
            .ToListAsync();

            List<responseUsers> res = new List<responseUsers>();
            foreach (var item in result)
            {
                res.Add(
                    new responseUsers()
                    {
                        userId = item.userId,
                        userName = item.userName,
                        userFullName = item.userFullName,
                        userLocationId = item.userLocationId ?? null,
                        userLocationCode = item.userLocationCode,
                        userLocationName = item.userLocationName,
                        perId = item.perId,
                        perName = item.perName,
                    }
                );
            }

            return res;
        }

        public async Task<List<responseUserPermission>> GetUserPermission()
        {

            var result = await (from a in _context.MPermissions
                                select new
                                {
                                    perId = a.PerId,
                                    perName = a.PerName,
                                }
            )
            .ToListAsync();

            List<responseUserPermission> res = new List<responseUserPermission>();
            foreach (var item in result)
            {

                var objPermission = await (   from a in _context.MPermissions
                                        join b in _context.TRolePermissions
                                        on a.PerId equals b.PerId
                                        join c in _context.MModularFunctions
                                        on b.ModularfuncCode equals c.ModularfuncCode
                                        where a.PerId == item.perId
                                        select new
                                        {
                                            perId = a.PerId,
                                            funcCode = b.ModularfuncCode,
                                            funcName = c.ModularfuncName
                                        }
                                    )
                                    .ToListAsync();

                List<responseUserPermissionFunc> listPermisstion = new List<responseUserPermissionFunc>();
                foreach (var item2 in objPermission)
                {
                    listPermisstion.Add(
                            new responseUserPermissionFunc()
                            {
                                perId = item2.perId,
                                funcCode = item2.funcCode,
                                funcName = item2.funcName,
                            }
                        );
                }

                res.Add(
                    new responseUserPermission()
                    {
                        perId = item.perId,
                        perName = item.perName,
                        permissionFunction = listPermisstion
                    }
                );
            }

            return res;
        }

        public async Task<List<responseWardMaster>> GetWardMaster()
        {

            var result = await (from a in _context.MWards
                                where a.WardStatus == "1"
                                select new
                                {
                                    wardCode = a.WardCode,
                                    wardName = a.WardName,
                                }
            )
            .ToListAsync();

            List<responseWardMaster> res = new List<responseWardMaster>();
            foreach (var item in result)
            {
                res.Add(
                    new responseWardMaster()
                    {
                        wardCode = item.wardCode,
                        wardName = item.wardName,
                    }
                );
            }

            return res;
        }

        public async Task<bool> UpdateMUsers(bodyUpdateMUsers bodyUser)
        {
            try
            {
                if(bodyUser.userId == null)
                {
                    return false;
                }
                
                MUser? objUser = await _context.MUsers.Where(x => x.UserId == bodyUser.userId).FirstOrDefaultAsync();
                if (objUser == null)
                { 
                    return false;
                }

                objUser.UserLocationId = bodyUser.locationId == 0 ? null : bodyUser.locationId;
                objUser.UserLocationCode = bodyUser.locationCode == "" ? null : bodyUser.locationCode;
                objUser.UserLocationName = bodyUser.locationName == "" ? null : bodyUser.locationName;
                objUser.PerId = bodyUser.perId == "" ? null : bodyUser.perId;
                objUser.PerAssignment = bodyUser.userAssign;
                objUser.UserUpdatedate = DateTime.Now.ToString("yyyy-MM-dd");
                objUser.UserUpdatetime = DateTime.Now.ToString("HH:mm");

                _context.MUsers.Update(objUser);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
