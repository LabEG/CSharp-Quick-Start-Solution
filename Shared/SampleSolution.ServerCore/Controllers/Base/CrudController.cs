using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SampleSolution.Core.Controllers.Base;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Models.Exceptions;
using SampleSolution.Core.Models.ViewModels.Pagination;
using SampleSolution.Core.Services.IServices.Base;

namespace SampleSolution.ServerCore.Controllers.Base
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CrudController<TEntity, TId> : BaseController, ICrudController<TEntity, TId>
        where TEntity : class, IEntity<TId>, new()
    {
        protected ICrudService<TEntity, TId> Service { get; }

        public CrudController(ICrudService<TEntity, TId> service)
        {
            this.Service = service;
        }

        [HttpPost]
        public virtual async Task<TEntity> Create([FromBody]TEntity entity)
        {
            if (!this.ModelState.IsValid)
            {
                throw new ValidationException();
            }

            return await this.Service.Create(entity);
        }

        [HttpGet]
        public virtual async Task<IList<TEntity>> GetAll()
        {
            return await this.Service.GetAll();
        }

        [HttpGet("{id}")]
        public virtual async Task<TEntity> GetById(TId id)
        {
            try
            {
                TEntity entity = await this.Service.GetById(id);
                return entity;
            }
            catch (ObjectNotFoundException exception)
            {
                this.Response.StatusCode = (int)HttpStatusCode.NotFound;
                Console.WriteLine(exception.Message + ":");
                Console.WriteLine(exception.StackTrace);
            }

            return null;
        }

        [HttpPut("{id}")]
        public virtual async Task Update(TId id, [FromBody]TEntity entity)
        {
            if (!this.ModelState.IsValid)
            {
                throw new ValidationException();
            }

            await this.Service.Update(id, entity);
        }

        [HttpDelete("{id}")]
        public virtual async Task Delete(TId id)
        {
            try
            {
                await this.Service.Delete(id);
            }
            catch (ObjectNotFoundException exception)
            {
                this.Response.StatusCode = (int)HttpStatusCode.NotFound;
                Console.WriteLine(exception.Message + ":");
                Console.WriteLine(exception.StackTrace);
            }
        }

        [HttpGet("paged")]
        public virtual async Task<PagedList<TEntity>> GetPaged([FromQuery] int pageSize,
                                                               [FromQuery] int pageNumber,
                                                               [FromQuery] string filter,
                                                               [FromQuery] string sort,
                                                               [FromQuery] string graph)
        {
            var query = await GetQuery(pageSize, pageNumber, filter, sort, graph);
            return await this.Service.GetPaged(query);
        }

        [HttpGet("{id}/graph")]
        public virtual async Task<TEntity> GetGraph(TId id, [FromQuery] string graph)
        {
            // prevent null
            if (graph == null)
            {
                this.Response.StatusCode = StatusCodes.Status400BadRequest;
                await this.Response.WriteAsync("Query param 'graph' cannot be 'null'");
                return null;
            }

            //prevent wrong JSON
            JObject graphObject;
            try
            {
                graphObject = JsonConvert.DeserializeObject(graph) as JObject;
            }
            catch (Exception exc)
            {
                this.Response.StatusCode = StatusCodes.Status400BadRequest;
                await this.Response.WriteAsync("JSON in 'graph'  is not a valid: " + exc.Message);
                return null;
            }

            // process request

            try
            {
                return await this.Service.GetGraph(id, graphObject);
            }
            catch (ObjectNotFoundException exception)
            {
                this.Response.StatusCode = (int)HttpStatusCode.NotFound;
                Console.WriteLine(exception.Message + ":");
                Console.WriteLine(exception.StackTrace);
            }

            return null;
        }

        protected async Task<PagedListQuery> GetQuery(
            int pageSize,
            int pageNumber,
            string filter,
            string sort,
            string graph)
        {
            PagedListQuery query = new PagedListQuery();
            if (pageSize != default(int))
            {
                query.PageSize = pageSize;
            }

            if (pageNumber != default(int))
            {
                query.PageNumber = pageNumber;
            }

            if (filter != default(string))
            {
                if (query.Filter == null)
                {
                    query.Filter = new List<PagedListQueryFilter>();
                }

                if (!string.IsNullOrEmpty(filter))
                {
                    string[] filterGroups = filter.Split(',');
                    foreach (string filterItem in filterGroups)
                    {
                        string[] filterSeparated = filterItem.Split('~');
                        if (filterSeparated.Length == 3)
                        {
                            query.Filter.Add(new PagedListQueryFilter()
                            {
                                Property = filterSeparated[0].First().ToString().ToUpper() + string.Join("", filterSeparated[0].Skip(1)),
                                Method = this.ParseFilterMethod(filterSeparated[1]),
                                Value = HttpUtility.UrlDecode(filterSeparated[2])
                            });
                        }
                    }
                }
            }

            if (sort != default(string))
            {
                if (query.Sort == null)
                {
                    query.Sort = new List<PagedListQuerySort>();
                }

                if (!string.IsNullOrEmpty(sort))
                {
                    string[] sortGroups = sort.Split(',');
                    foreach (string sortItem in sortGroups)
                    {
                        string[] sortSeparated = sortItem.Split('~');
                        if (sortSeparated.Length == 2)
                        {
                            query.Sort.Add(new PagedListQuerySort()
                            {
                                Property = sortSeparated[0].First().ToString().ToUpper() + string.Join("", sortSeparated[0].Skip(1)),
                                Direction = sortSeparated[1].ToLower() == "asc" ? PagedListQuerySortDirection.Asc : PagedListQuerySortDirection.Desc
                            });
                        }
                    }
                }
            }

            // prevent null
            if (graph is string)
            {
                try
                {
                    query.Graph = JsonConvert.DeserializeObject(graph) as JObject;
                }
                catch (Exception exc)
                {
                    this.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await this.Response.WriteAsync("JSON in 'graph' is not a valid: " + exc.Message);
                    return null;
                }
            }
            return query;
        }

        private PagedListQueryFilterMethod ParseFilterMethod(string method)
        {
            switch (method)
            {
                case "<":
                    return PagedListQueryFilterMethod.Less;

                case "<=":
                    return PagedListQueryFilterMethod.LessOrEqual;

                case ">=":
                    return PagedListQueryFilterMethod.GreatOrEqual;

                case ">":
                    return PagedListQueryFilterMethod.Great;

                case "like":
                    return PagedListQueryFilterMethod.Like;

                case "ilike":
                    return PagedListQueryFilterMethod.ILike;

                case "=":
                default:
                    return PagedListQueryFilterMethod.Equal;
            }
        }
    }
}