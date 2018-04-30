using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SampleSolution.Core.Models;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Models.ViewModels.Pagination;

namespace SampleSolution.Core.Repositories.Base
{
    public class BaseRepository
    {
        public static HttpClient client = new HttpClient() { Timeout = TimeSpan.FromSeconds(10) };
    }

    public class CrudHttpRepository<TEntity, TId> : ICrudRepository<TEntity, TId> where TEntity : class, IEntity<TId>//, new()
    {
        protected CrudHttpRepositoryConfig Config { get; set; }
        protected string EndPoint { get; set; }

        public CrudHttpRepository(CrudHttpRepositoryConfig config, string endPoint)
        {
            this.Config = config;
            this.EndPoint = endPoint;
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            return await this.CreateByUrl(entity, this.Config.BaseAdress + "/" + this.EndPoint);
        }

        public async Task<TEntity> CreateByUrl(TEntity entity, string url)
        {
            return await this.PostAsync(
                url,
                new StringContent(
                    JsonConvert.SerializeObject(entity),
                    Encoding.UTF8,
                    "application/json"
                )
            );
        }

        public async Task Delete(TId id)
        {
            await this.DeleteAsync(this.Config.BaseAdress + "/" + this.EndPoint + "/" + id);
        }

        public async Task<TEntity> GetById(TId id)
        {
            return await this.GetAsync(this.Config.BaseAdress + "/" + this.EndPoint + "/" + id);
        }

        public async Task<IList<TEntity>> GetAll()
        {
            return await this.GetAllAsync(this.Config.BaseAdress + "/" + this.EndPoint);
        }

        public async Task Update(TId id, TEntity entity)
        {
            await this.PutAsync(
                this.Config.BaseAdress + "/" + this.EndPoint + "/" + id,
                new StringContent(
                    JsonConvert.SerializeObject(entity),
                    Encoding.UTF8,
                    "application/json"
                )
            );
        }

        public async Task<PagedList<TEntity>> GetPaged(PagedListQuery query, IQueryable<TEntity> data = null)
        {
            List<string> gets = new List<string>();

            if (query.PageNumber > 0)
            {
                gets.Add($"pageNumber={HttpUtility.UrlPathEncode(query.PageNumber.ToString())}");
            }

            if (query.PageSize > 0)
            {
                gets.Add($"pageSize={HttpUtility.UrlPathEncode(query.PageNumber.ToString())}");
            }

            if (query.Sort != null)
            {
                IEnumerable<string> sortRequest = query.Sort.Select((PagedListQuerySort sort) =>
                {
                    string direction = sort.Direction == PagedListQuerySortDirection.Desc ? "desc" : "asc";
                    return $"{sort.Property}~{direction}";
                });
                gets.Add($"sort={HttpUtility.UrlPathEncode(string.Join(",", sortRequest))}");
            }

            if (query.Filter != null)
            {
                IEnumerable<string> filterRequest = query.Filter.Select((PagedListQueryFilter filter) =>
                {
                    string method;
                    switch (filter.Method)
                    {
                        case PagedListQueryFilterMethod.Less:
                            method = "<";
                            break;

                        case PagedListQueryFilterMethod.LessOrEqual:
                            method = "<=";
                            break;

                        case PagedListQueryFilterMethod.GreatOrEqual:
                            method = ">=";
                            break;

                        case PagedListQueryFilterMethod.Great:
                            method = ">";
                            break;

                        case PagedListQueryFilterMethod.Like:
                            method = "like";
                            break;

                        case PagedListQueryFilterMethod.ILike:
                            method = "ilike";
                            break;

                        case PagedListQueryFilterMethod.Equal:
                        default:
                            method = "=";
                            break;
                    }
                    return $"{filter.Property}~{method}~{filter.Value}";
                });
                gets.Add($"filter={HttpUtility.UrlPathEncode(string.Join(",", filterRequest))}");
            }

            if (query.Graph != null)
            {
                gets.Add($"graph={HttpUtility.UrlPathEncode(JsonConvert.SerializeObject(query.Graph))}");
            }

            string url = this.Config.BaseAdress + "/" + this.EndPoint + "/paged?" + string.Join("&", gets);
            HttpResponseMessage httpResponseMessage = await BaseRepository.client.GetAsync(url);
            this.CheckResponseStatus(httpResponseMessage);
            string response = await httpResponseMessage.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<PagedList<TEntity>>(response);
        }

        public async Task<TEntity> GetGraph(TId id, JObject graph)
        {
            return await this.GetAsync(
                this.Config.BaseAdress + "/" + this.EndPoint + "/" + id + "/graph?" +
                "graph=" + JsonConvert.SerializeObject(graph)
            );
        }

        // handler
        protected void CheckResponseStatus(HttpResponseMessage httpResponseMessage)
        {
            // todo: move bottom, after success status
            string responseBody = httpResponseMessage.Content.ReadAsStringAsync().Result;

            Debug.WriteLine("=== \r\n {0} \r\n === \r\n {1} \r\n ===", JsonConvert.SerializeObject(httpResponseMessage), responseBody);

            if (httpResponseMessage.IsSuccessStatusCode)
            {
                return;
            }

            // message from back
            if (responseBody.IndexOf("{\"message\":") == 0)
            {
                var respMessage = responseBody.Substring(12, responseBody.Length - 2 - 12);
                Debug.WriteLine($"Web exception: \n responce: {responseBody} \n message: {respMessage}");
                throw new Exception(respMessage);
            }

            // nginx exception
            if (false)
            {
            }

            // tomcat exception
            if (responseBody.IndexOf("<") == 0)
            {
                Regex rgx = new Regex("<b>description</b> <u>(.+?)</u>");
                Match match = rgx.Match(responseBody);
                throw new Exception("WebServerException - " + match.Groups[1] ?? httpResponseMessage.ReasonPhrase ?? "Ошибка не указана");
            }

            throw new Exception(httpResponseMessage.ReasonPhrase);
        }

        // DeleteAsync
        protected async Task DeleteAsync(string requestUri, CancellationToken cancellationToken = new CancellationToken())
        {
            HttpResponseMessage httpResponseMessage = await BaseRepository.client.DeleteAsync(requestUri, cancellationToken);
            this.CheckResponseStatus(httpResponseMessage);
        }

        // GetAsync
        protected async Task<TEntity> GetAsync(
            string requestUri,
            HttpCompletionOption completionOption = new HttpCompletionOption(),
            CancellationToken cancellationToken = new CancellationToken()
        )
        {
            HttpResponseMessage httpResponseMessage = await BaseRepository.client.GetAsync(requestUri, completionOption, cancellationToken);
            this.CheckResponseStatus(httpResponseMessage);
            string response = await httpResponseMessage.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<TEntity>(response);
        }

        protected async Task<TEntity[]> GetAllAsync(
            string requestUri,
            HttpCompletionOption completionOption = new HttpCompletionOption(),
            CancellationToken cancellationToken = new CancellationToken()
        )
        {
            HttpResponseMessage httpResponseMessage = await BaseRepository.client.GetAsync(requestUri, completionOption, cancellationToken);
            this.CheckResponseStatus(httpResponseMessage);
            string response = await httpResponseMessage.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<TEntity[]>(response);
        }

        // PostAsync
        protected async Task<TEntity> PostAsync(
            string requestUri,
            HttpContent content = null,
            CancellationToken cancellationToken = new CancellationToken()
        )
        {
            HttpResponseMessage httpResponseMessage = await BaseRepository.client.PostAsync(requestUri, content, cancellationToken);
            this.CheckResponseStatus(httpResponseMessage);
            string response = await httpResponseMessage.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<TEntity>(response);
        }

        // PutAsync
        protected async Task<TEntity> PutAsync(
            string requestUri,
            HttpContent content = null,
            CancellationToken cancellationToken = new CancellationToken()
        )
        {
            HttpResponseMessage httpResponseMessage = await BaseRepository.client.PutAsync(requestUri, content, cancellationToken);
            this.CheckResponseStatus(httpResponseMessage);
            string response = await httpResponseMessage.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<TEntity>(response);
        }
    }
}