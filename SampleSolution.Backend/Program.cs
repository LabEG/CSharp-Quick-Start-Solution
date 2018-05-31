using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace SampleSolution.Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;

            Console.WriteLine("");
            Console.WriteLine("SampleSolution - Backend. Build: {_date_}");
            Console.WriteLine("");

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}