using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace SampleSolution.ServerCore.Controllers.Base
{
    public class BaseConstroller : Controller
    {
        protected virtual async Task<bool> CheckIsCorrectModel()
        {
            if (this.ModelState.IsValid)
            {
                return true;
            }
            else
            {
                this.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                StringBuilder message = new StringBuilder();
                message.AppendLine("Wrong JSON model:");

                foreach (KeyValuePair<string, ModelStateEntry> state in this.ModelState)
                {
                    foreach (ModelError error in state.Value.Errors)
                    {
                        if (state.Key.Length > 0)
                        {
                            message.Append("    " + state.Key + ": ");
                        }
                        else
                        {
                            message.Append("  ");
                        }

                        if (error.ErrorMessage.Length > 0)
                        {
                            message.Append(error.ErrorMessage);

                            if (error.Exception is Exception)
                            {
                                message.AppendLine();
                                message.Append("        ");
                            }
                        }

                        if (error.Exception is Exception)
                        {
                            message.Append(error.Exception.Message);
                        }

                        message.AppendLine();
                    }
                }

                await this.Response.WriteAsync(message.ToString(), Encoding.UTF8);

                return false;
            }
        }
    }
}