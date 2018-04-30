using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Models.ViewModels.Pagination;

namespace SampleSolution.Core.Repositories.Base
{
    public class CrudFileRepository<TEntity, TId> : ICrudRepository<TEntity, TId> where TEntity : class, IEntity<TId>//, new()
    {
        protected long countId = 0;
        protected string folderPath;

        public CrudFileRepository()
        {
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            if (typeof(TId) == typeof(long))
            {
                IEntity<long> ent = (IEntity<long>)entity;
                if (ent.Id == 0)
                {
                    ent.Id = this.countId++;
                }
            }
            else if (typeof(TId) == typeof(string))
            {
                IEntity<string> ent = (IEntity<string>)entity;
                if (string.IsNullOrWhiteSpace(ent.Id))
                {
                    ent.Id = Guid.NewGuid().ToString();
                }
            }

            string fileName = "data_" + this.ExcapeFileName(entity.Id.ToString()) + ".json";

            using (StreamWriter sw = new StreamWriter(Path.Combine(this.folderPath, fileName)))
            {
                string json = JsonConvert.SerializeObject(entity);
                await sw.WriteAsync(json);
            }

            return await this.GetById(entity.Id);
        }

        public async Task Delete(TId id)
        {
            await Task.Run(() =>
            {
                string fullFileName = Path.Combine(this.folderPath, "data_" + this.ExcapeFileName(id.ToString()) + ".json");
                FileInfo fileInfo = new FileInfo(fullFileName);
                fileInfo.Delete();
            });
        }

        public async Task<TEntity> GetById(TId id)
        {
            string fileName = "data_" + this.ExcapeFileName(id.ToString()) + ".json";
            return await GetByFileName(fileName);
        }

        //TODO: test it
        public async Task<IList<TEntity>> GetAll()
        {
            return await Task.Run(async () =>
            {
                try
                {
                    DirectoryInfo folder = new DirectoryInfo(this.folderPath);
                    FileInfo[] files = folder.GetFiles();
                    TEntity[] entities = new TEntity[files.Length];

                    for (long i = 0; i < files.Length; i++)
                    {
                        entities[i] = await GetByFileName(files[i].Name);
                    }

                    return entities;
                }
                catch (Exception e)
                {
                    Debug.WriteLine($"ERROR in GetList get {typeof(TEntity).Name} : {e.Message} \n {e.StackTrace}");
                    throw e;
                }
            });
        }

        public async Task Update(TId id, TEntity entity)
        {
            string fileName = "data_" + this.ExcapeFileName(id.ToString()) + ".json";

            using (StreamWriter sw = new StreamWriter(Path.Combine(this.folderPath, fileName)))
            {
                string json = JsonConvert.SerializeObject(entity);
                await sw.WriteAsync(json);
            }
        }

        public async Task<PagedList<TEntity>> GetPaged(PagedListQuery query, IQueryable<TEntity> data = null)
        {
            await Task.Delay(0);
            throw new NotImplementedException();
        }

        public async Task<TEntity> GetGraph(TId id, JObject graph)
        {
            await Task.Delay(0);
            throw new NotImplementedException();
        }

        protected async Task<TEntity> GetByFileName(string fileName)
        {
            using (StreamReader sr = new StreamReader(Path.Combine(this.folderPath, fileName)))
            {
                string json = await sr.ReadToEndAsync();
                TEntity entity = JsonConvert.DeserializeObject<TEntity>(json);
                return entity;
            }
        }

        protected void SetPath(string path)
        {
            this.folderPath = path;
            DirectoryInfo folder = new DirectoryInfo(this.folderPath);
            if (!folder.Exists)
            {
                folder.Create();
            }

            if (typeof(TId) == typeof(long))
            {
                FileInfo[] files = folder.GetFiles();
                if (files.Length > 0)
                {
                    this.countId = files.Select(file => long.Parse(Path.GetFileNameWithoutExtension(file.Name).Split('_')[1])).Max();
                }
                this.countId++;
            }
        }

        private string ExcapeFileName(string name)
        {
            string invalidChars = Regex.Escape(new string(Path.GetInvalidFileNameChars()));
            string invalidRegStr = string.Format(@"([{0}]*\.+$)|([{0}]+)", invalidChars);

            return Regex.Replace(name, invalidRegStr, "_");
        }
    }
}