using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json.Linq;
using SampleSolution.Core.IRepositories.Base;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Models.Exceptions;
using SampleSolution.Core.Models.ViewModels.Pagination;
using SampleSolution.Core.Repositories.Base;

namespace SampleSolution.ServerCore.Repositories.Base
{
    public class CrudDbRepository<TDbContext, TEntity, TId> : ICrudDbRepository<TDbContext, TEntity, TId>
        where TDbContext : DbContext
        where TEntity : class, IEntity<TId>, new()
    {
        protected TDbContext DBContext { get; }

        public CrudDbRepository(TDbContext dbContext)
        {
            this.DBContext = dbContext;
        }

        public virtual async Task<TEntity> Create(TEntity entity)
        {
            await Task.Delay(0);
            entity.Id = default(TId);
            this.DBContext.Set<TEntity>().Update(entity);
            return entity;
        }

        public virtual async Task<TEntity> GetById(TId id)
        {
            TEntity resultEntity = await this.DBContext
                .Set<TEntity>()
                .FirstOrDefaultAsync((entity) => entity.Id.Equals(id));
            if (resultEntity == null)
            {
                throw new ObjectNotFoundException();
            }
            return resultEntity;
        }

        public virtual async Task<IList<TEntity>> GetAll()
        {
            return await this.DBContext.Set<TEntity>().ToListAsync();
        }

        public virtual async Task Update(TId id, TEntity entity)
        {
            await Task.Delay(0);

            entity.Id = id;
            EntityEntry<TEntity> ent = this.DBContext.Set<TEntity>().Update(entity);
        }

        public virtual async Task Delete(TId id)
        {
            TEntity entity = await this.GetById(id);
            this.DBContext.Set<TEntity>().Remove(entity);
        }

        public virtual async Task<PagedList<TEntity>> GetPaged(PagedListQuery query, IQueryable<TEntity> qData = null)
        {
            PagedList<TEntity> resultEntity = new PagedList<TEntity>();
            resultEntity.PageMeta.PageNumber = query.PageNumber;
            resultEntity.PageMeta.PageSize = query.PageSize;

            IQueryable<TEntity> queryableData = qData != null ? qData : this.DBContext
                .Set<TEntity>();

            if (query.Graph is JObject)
            {
                IList<string> listOfProps = this.ExtractIncludes(query.Graph);
                foreach (string prop in listOfProps)
                {
                    queryableData = queryableData.Include(prop);
                }
            }

            queryableData = this.AddFilter(queryableData, query.Filter);
            queryableData = this.AddSort(queryableData, query.Sort);

            // count total elements
            int countPage = await queryableData.CountAsync();
            resultEntity.PageMeta.TotalElements = countPage;

            // count total pages
            int extraCount = countPage % query.PageSize > 0 ? 1 : 0;
            resultEntity.PageMeta.TotalPages = (countPage < query.PageSize) ? 1 : (countPage / query.PageSize) + extraCount;

            // get elements
            int countFrom = query.PageNumber == 1 ? 0 : (query.PageSize * query.PageNumber) - query.PageSize;
            resultEntity.Elements = await queryableData
                .Skip(countFrom)
                .Take(query.PageSize)
                .ToListAsync();

            resultEntity.PageMeta.ElementsInPage = resultEntity.Elements.LongCount();

            return resultEntity;
        }

        public virtual async Task<TEntity> GetGraph(TId id, JObject graph)
        {
            IQueryable<TEntity> graphQuery = this.DBContext.Set<TEntity>();

            IList<string> listOfProps = this.ExtractIncludes(graph);

            foreach (string prop in listOfProps)
            {
                graphQuery = graphQuery.Include(prop);
            }

            TEntity resultEntity = await graphQuery.FirstOrDefaultAsync((entity) => entity.Id.Equals(id));
            if (resultEntity == null)
            {
                throw new ObjectNotFoundException();
            }
            return resultEntity;
        }

        protected IQueryable<TEntity> AddFilter(IQueryable<TEntity> queryableData, IList<PagedListQueryFilter> filters)
        {
            if (filters is List<PagedListQueryFilter>)
            {
                foreach (PagedListQueryFilter filter in filters)
                {
                    if (!string.IsNullOrEmpty(filter.Property))
                    {
                        ParameterExpression param = Expression.Parameter(typeof(TEntity), "TEntity");
                        Expression memberExpression = this.GetMemberExpression(filter.Property, param, typeof(TEntity));
                        if (memberExpression is MemberExpression)
                        {
                            Expression body = null;

                            if (filter.Method == PagedListQueryFilterMethod.Less)
                            {
                                body = Expression.LessThan(
                                    memberExpression,
                                    Expression.Constant(this.ToType(filter.Value, memberExpression.Type))
                                );
                            }

                            if (filter.Method == PagedListQueryFilterMethod.LessOrEqual)
                            {
                                body = Expression.LessThanOrEqual(
                                    memberExpression,
                                    Expression.Constant(this.ToType(filter.Value, memberExpression.Type))
                                );
                            }

                            if (filter.Method == PagedListQueryFilterMethod.Equal)
                            {
                                body = Expression.Equal(
                                    memberExpression,
                                    Expression.Constant(this.ToType(filter.Value, memberExpression.Type))
                                );
                            }

                            if (filter.Method == PagedListQueryFilterMethod.GreatOrEqual)
                            {
                                body = Expression.GreaterThanOrEqual(
                                    memberExpression,
                                    Expression.Constant(this.ToType(filter.Value, memberExpression.Type))
                                );
                            }

                            if (filter.Method == PagedListQueryFilterMethod.Great)
                            {
                                body = Expression.GreaterThan(
                                    memberExpression,
                                    Expression.Constant(this.ToType(filter.Value, memberExpression.Type))
                                );
                            }

                            if (filter.Method == PagedListQueryFilterMethod.Like)
                            {
                                body = Expression.Call(
                                    memberExpression,
                                    typeof(string).GetMethod("Contains", new[] { typeof(string) }),
                                    Expression.Constant(this.ToType(filter.Value, memberExpression.Type))
                                );
                            }

                            if (filter.Method == PagedListQueryFilterMethod.ILike)
                            {
                                MethodCallExpression indexOf = Expression.Call(
                                    memberExpression,
                                    "IndexOf",
                                    null,
                                    Expression.Constant(filter.Value, typeof(string)),
                                    Expression.Constant(StringComparison.InvariantCultureIgnoreCase)
                                );

                                body = Expression.GreaterThanOrEqual(indexOf, Expression.Constant(0));
                            }

                            if (body is Expression)
                            {
                                Expression<Func<TEntity, bool>> lambda = Expression.Lambda<Func<TEntity, bool>>(body, param);
                                queryableData = queryableData.Where(lambda);
                            }
                        }
                    }
                }
            }
            return queryableData;
        }

        protected IQueryable<TEntity> AddSort(IQueryable<TEntity> queryableData, IList<PagedListQuerySort> sorts)
        {
            if (sorts is List<PagedListQuerySort>)
            {
                int sortIndex = 0;
                foreach (PagedListQuerySort sort in sorts)
                {
                    if (!string.IsNullOrEmpty(sort.Property))
                    {
                        ParameterExpression param = Expression.Parameter(typeof(TEntity), "TEntity");
                        Expression memberExpression = this.GetMemberExpression(sort.Property, param, typeof(TEntity));

                        if (memberExpression is MemberExpression)
                        {
                            LambdaExpression selector = Expression.Lambda(memberExpression, param);

                            if (sort.Direction == PagedListQuerySortDirection.Asc)
                            {
                                MethodCallExpression call = Expression.Call(
                                    typeof(Queryable),
                                    sortIndex == 0 ? "OrderBy" : "ThenBy",
                                    new Type[] { typeof(TEntity), selector.Body.Type },
                                    queryableData.Expression,
                                    selector
                                );
                                queryableData = queryableData.Provider.CreateQuery(call) as IQueryable<TEntity>;
                            }
                            else
                            {
                                MethodCallExpression call = Expression.Call(
                                    typeof(Queryable),
                                    sortIndex == 0 ? "OrderByDescending" : "ThenByDescending",
                                    new Type[] { typeof(TEntity), selector.Body.Type },
                                    queryableData.Expression,
                                    selector
                                );
                                queryableData = queryableData.Provider.CreateQuery(call) as IQueryable<TEntity>;
                            }

                            sortIndex++;
                        }
                    }
                }
            }

            return queryableData;
        }

        protected IList<string> ExtractIncludes(JObject graph, IList<string> listOfProps = null, string previosProp = null)
        {
            if (listOfProps == null)
            {
                listOfProps = new List<string>();
            }

            foreach (KeyValuePair<string, JToken> prop in graph)
            {
                if (prop.Value.ToObject<object>() is object)
                {
                    this.ExtractIncludes((JObject)prop.Value, listOfProps, this.ToCamelCase(prop.Key));
                }
                else if (prop.Value.ToObject<object>() == null)
                {
                    listOfProps.Add((previosProp is string ? previosProp + "." : "") + this.ToCamelCase(prop.Key));
                } // else ignore
            }

            return listOfProps;
        }

        protected Expression GetMemberExpression(string nestedProperty, ParameterExpression param, Type entityType)
        {
            // https://stackoverflow.com/questions/16208214/construct-lambdaexpression-for-nested-property-from-string

            Type elementType = entityType;
            Expression memberExpression = param;
            foreach (string member in nestedProperty.Split('.'))
            {
                string propName = this.ToCamelCase(member);
                PropertyInfo sortableProperty = elementType.GetProperty(propName);

                if (sortableProperty is PropertyInfo) // if not null
                {
                    memberExpression = Expression.PropertyOrField(memberExpression, member);
                    elementType = sortableProperty.PropertyType;
                }
                else
                {
                    return null;
                }
            }

            return memberExpression;
        }

        protected string ToCamelCase(string value)
        {
            return value.First().ToString().ToUpper() + string.Join("", value.Skip(1));
        }

        protected object ToType(string value, Type type)
        {
            return TypeDescriptor.GetConverter(type).ConvertFromInvariantString(value);
        }
    }
}