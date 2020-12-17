using System;
using System.Collections.Generic;
using System.Text;

namespace SampleSolution.ServerCore.Models.Settings
{
    public class SmtpSettings
    {
        public string SendServer { get; set; }
        public ushort SendServerPort { get; set; }
        public string NoReplyEmail { get; set; }
        public bool NoReplyUseAuth { get; set; }
        public string NoReplyPassword { get; set; }
    }
}