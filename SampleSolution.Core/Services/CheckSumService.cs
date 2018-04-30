using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace SampleSolution.Core.Services
{
    public class CheckSumService
    {
        public string CalcMD5(byte[] data)
        {
            string checkSumSHA1;
            using (SHA1CryptoServiceProvider sha1 = new SHA1CryptoServiceProvider())
            {
                checkSumSHA1 = Convert.ToBase64String(sha1.ComputeHash(data));
            }
            return checkSumSHA1;
        }

        public string CalcSHA1(byte[] data)
        {
            StringBuilder checkSumMD5 = new StringBuilder();
            MD5 md5Hash = MD5.Create();
            byte[] hashData = md5Hash.ComputeHash(data);
            for (int i = 0; i < hashData.Length; i++)
            {
                checkSumMD5.Append(hashData[i].ToString("x2"));
            }
            return checkSumMD5.ToString();
        }
    }
}